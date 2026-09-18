import { interpolate, spring } from "remotion";
import t from "../timeline.json";
const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};
export const AnimatedWord: React.FC<{
  text: string;
  frame: number;
  start: number;
  mode: "sway" | "punch" | "tumble";
  dark?: boolean;
}> = ({ text, frame, start, mode, dark = false }) => (
  <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
    {[...text].map((letter, i) => {
      const f = frame - start - i * 2;
      let x = 0,
        y = 0,
        angle = 0,
        sx = 1,
        sy = 1;
      if (mode === "sway") {
        const envelope = interpolate(f, [0, 5, 23, 34], [0, 1, 0.65, 0], clamp);
        x = Math.sin(f * 0.33 - i * 0.4) * 24 * envelope;
        y = Math.sin(f * 0.24 + i * 0.6) * 12 * envelope;
        angle = Math.sin(f * 0.3) * 7 * envelope;
      } else if (mode === "punch") {
        const settle = spring({
          frame: Math.max(0, f),
          fps: 30,
          config: { damping: 13, stiffness: 230, mass: 0.6 },
        });
        x = (1 - settle) * (i % 2 ? -115 : 115);
        y = (1 - settle) * (i % 2 ? 110 : -110);
        angle = (1 - settle) * (i % 2 ? -22 : 22);
        sx = 0.5 + 0.5 * settle;
        sy = 1.7 - 0.7 * settle;
      } else {
        const fall = interpolate(f, [0, 13, 24], [0, 1, 1], clamp);
        const recover = spring({
          frame: Math.max(0, frame - t.ctaRecover - i * 2),
          fps: 30,
          config: { damping: 15, stiffness: 190, mass: 0.65 },
        });
        const amount = fall * (1 - recover);
        x = amount * (35 + i * 12);
        y = amount * (75 + i * 13);
        angle = amount * (24 + i * 7);
      }
      const gradient = mode !== "punch";
      return (
        <span
          key={i}
          style={{
            display: "inline-block",
            position: "relative",
            transformOrigin: "50% 85%",
            transform: `translate(${x}px, ${y}px) rotate(${angle}deg) scale(${sx}, ${sy})`,
            color: gradient ? "transparent" : dark ? "#080809" : "#f7f6f2",
            backgroundImage: gradient
              ? `linear-gradient(${110 + Math.sin(frame * 0.06) * 30}deg, #ff6026, #ffac39 28%, #f64290 54%, #9064ef 76%, #ff6026)`
              : undefined,
            backgroundSize: "280% 100%",
            backgroundPosition: `${(frame * 4 + i * 27) % 200}% 50%`,
            backgroundClip: gradient ? "text" : undefined,
            WebkitBackgroundClip: gradient ? "text" : undefined,
          }}
        >
          {letter}
        </span>
      );
    })}
  </span>
);
