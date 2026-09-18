export const unit = (v: number) => Math.max(0, Math.min(1, v));
export const smooth = (v: number) => {
  const u = unit(v);
  return u * u * (3 - 2 * u);
};
export const spinYaw = (
  frame: number,
  startFrame: number,
  endFrame: number,
  finalYaw: number,
  degrees: number,
) => {
  const rotation = (degrees * Math.PI) / 180;
  return (
    finalYaw -
    rotation +
    rotation * smooth((frame - startFrame) / (endFrame - startFrame))
  );
};
