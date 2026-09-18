import { ThreeCanvas } from "@remotion/three";
import { AbsoluteFill, interpolate, useVideoConfig } from "remotion";
import { Product } from "./Product";
import { smooth, spinYaw } from "./motion";
import t from "./timeline.json";

export const ProductStage: React.FC<{ frame: number; flat?: boolean }> = ({
  frame,
  flat = false,
}) => {
  const { width, height } = useVideoConfig();
  const intro = frame < t.xStart;
  const u = smooth((frame - t.heroStart) / (t.spinEnd - t.heroStart));
  let yaw = spinYaw(
    frame,
    t.heroStart,
    t.spinEnd,
    t.finalYaw,
    t.rotationDegrees,
  );
  let scale = 0.62 + 0.47 * u;
  let x = 0,
    y = 0.07 * (1 - u),
    tilt = -0.075;
  if (intro) {
    yaw = t.finalYaw;
    scale = 0.61;
    x = 1.12;
    y = -0.06;
    tilt = 0;
  } else if (frame >= t.spinEnd && frame < t.macroStart) {
    scale = 1.09 + 0.025 * Math.sin((frame - t.spinEnd) * 0.018);
    yaw = t.finalYaw - 0.08 * smooth((frame - t.spinEnd) / 60);
  } else if (frame >= t.macroStart && frame < t.sameStart) {
    const q = smooth((frame - t.macroStart) / (t.sameStart - t.macroStart));
    scale = 2.0 + 0.48 * q;
    x = 0.76 + 0.12 * q;
    y = -0.13;
    yaw = -0.16 - 0.08 * q;
    tilt = -0.13;
  } else if (frame >= t.sameStart) {
    yaw = t.finalYaw;
    scale = 1.0;
    x = 0;
    y = 0;
    tilt = -0.075;
  }
  const visible =
    intro ||
    (frame >= t.heroStart && frame < t.sameStart) ||
    (frame >= t.comparisonStart && frame < t.impactStart);
  const wipe = interpolate(frame, [t.wipeStart, t.wipeEnd], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = flat
    ? intro || (frame >= t.comparisonStart && frame < t.impactStart)
      ? 1
      : 0
    : visible && !intro
      ? 1
      : 0;
  return (
    <AbsoluteFill
      style={{
        opacity,
        background: flat ? "#e5e5e5" : "transparent",
        clipPath: flat && !intro ? `inset(0 ${wipe}% 0 0)` : "none",
        pointerEvents: "none",
      }}
    >
      <ThreeCanvas
        width={width}
        height={height}
        camera={{ position: [0, 0.12, 5.5], fov: 32 }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
      >
        <ambientLight intensity={flat ? 2.6 : 1.3} />
        <directionalLight
          position={[3, 4, 5]}
          intensity={flat ? 0.6 : 4}
          color={flat ? "#ffffff" : "#fff0d8"}
        />
        <directionalLight
          position={[-4, 1, -2]}
          intensity={flat ? 0 : 3.1}
          color="#3264ff"
        />
        <directionalLight
          position={[-2, -1, 4]}
          intensity={flat ? 0.3 : 1}
          color={flat ? "#ffffff" : "#ffbc80"}
        />
        <Product
          flat={flat}
          rotation={[0.13, yaw, tilt]}
          position={[x, y, 0]}
          scale={scale}
        />
      </ThreeCanvas>
    </AbsoluteFill>
  );
};
