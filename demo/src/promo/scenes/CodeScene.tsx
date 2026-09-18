import { AbsoluteFill, Easing, interpolate } from "remotion";
import source from "../source-excerpt.json";
import t from "../timeline.json";
const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
  easing: Easing.bezier(0.16, 1, 0.3, 1),
};
const colorize = (line: string) =>
  line.split(/(let|spinYaw|frame|t\.[a-zA-Z]+)/g).map((token, i) => (
    <span
      key={i}
      style={{
        color:
          token === "let"
            ? "#bf94ff"
            : token === "spinYaw"
              ? "#ff8852"
              : token.startsWith("t.")
                ? "#85bfff"
                : "#f7f6f2",
      }}
    >
      {token}
    </span>
  ));
export const CodeScene: React.FC<{ frame: number }> = ({ frame }) => {
  const f = frame - t.codeStart;
  const exit = interpolate(
    frame,
    [t.heroStart - 8, t.heroStart],
    [1, 0],
    clamp,
  );
  return (
    <AbsoluteFill style={{ background: "#050506", opacity: exit }}>
      <div
        style={{
          position: "absolute",
          top: 94,
          width: "100%",
          textAlign: "center",
          fontSize: 140,
          lineHeight: 1,
          letterSpacing: -7,
          translate: `0 ${interpolate(f, [0, 9], [90, 0], clamp)}px`,
        }}
      >
        Your code. In motion.
      </div>
      <div
        style={{
          position: "absolute",
          left: 420,
          top: 317,
          fontFamily: "IBM Plex Mono",
          fontWeight: 500,
          fontSize: 49,
          lineHeight: 1.43,
          letterSpacing: -1,
        }}
      >
        {source.lines.map((line, i) => (
          <div
            key={i}
            style={{
              whiteSpace: "pre",
              opacity: interpolate(f, [4 + i * 2, 10 + i * 2], [0, 1], clamp),
              translate: `${interpolate(f, [4 + i * 2, 17 + i * 2], [150, 0], clamp)}px 0`,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 100,
                color: "#62626c",
                fontSize: 32,
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            {colorize(line)}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
