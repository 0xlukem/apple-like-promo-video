import { AbsoluteFill } from "remotion";
export const Intro: React.FC = () => (
  <AbsoluteFill style={{ color: "#727272", pointerEvents: "none" }}>
    <div
      style={{
        position: "absolute",
        left: 350,
        top: 210,
        fontSize: 64,
        fontWeight: 500,
        letterSpacing: -2,
      }}
    >
      Introducing Pulse.
    </div>
    <div
      style={{
        position: "absolute",
        left: 350,
        top: 307,
        fontSize: 28,
        fontWeight: 400,
      }}
    >
      A portable speaker.
    </div>
    <div
      style={{
        position: "absolute",
        left: 350,
        top: 405,
        border: "1px solid #b4b4b4",
        padding: "18px 35px",
        fontSize: 24,
        fontWeight: 400,
      }}
    >
      Learn more
    </div>
  </AbsoluteFill>
);
