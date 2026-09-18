import { AbsoluteFill, Easing, interpolate } from "remotion";
import t from "../timeline.json";
const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
  easing: Easing.bezier(0.16, 1, 0.3, 1),
};

export const Interruption: React.FC<{ frame: number }> = ({ frame }) => (
  <AbsoluteFill
    style={{
      background: "#050506",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <svg
      width="825"
      height="825"
      viewBox="0 0 460 460"
      style={{
        scale: interpolate(
          frame,
          [t.xStart, t.xArrival, t.phraseStart],
          [0.38, 1, 0.96],
          clamp,
        ),
      }}
    >
      <path
        d="M80 80L380 380M380 80L80 380"
        stroke="#ff5724"
        strokeWidth="85"
      />
    </svg>
  </AbsoluteFill>
);

export const HeroType: React.FC<{
  frame: number;
  start: number;
  arrival: number;
  text: React.ReactNode;
  light?: boolean;
  size?: number;
  zoom?: boolean;
}> = ({
  frame,
  start,
  arrival,
  text,
  light = false,
  size = 348,
  zoom = false,
}) => (
  <AbsoluteFill
    style={{
      background: light ? "#f7f6f2" : "#050506",
      color: light ? "#080809" : "#f7f6f2",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <div
      style={{
        overflow: "hidden",
        textAlign: "center",
        padding: "135px 100px",
      }}
    >
      <div
        style={{
          fontSize: size,
          fontWeight: 800,
          lineHeight: 0.97,
          letterSpacing: -size * 0.026,
          translate: zoom
            ? undefined
            : `0 ${interpolate(frame, [start, arrival], [500, 0], clamp)}px`,
          scale: zoom
            ? interpolate(frame, [start, arrival], [1.5, 1], clamp)
            : 1,
        }}
      >
        {text}
      </div>
    </div>
  </AbsoluteFill>
);
