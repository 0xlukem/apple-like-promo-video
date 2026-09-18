import "./index.css";
import { Composition } from "remotion";
import { Promo } from "./promo/Promo";
import t from "./promo/timeline.json";
export const RemotionRoot: React.FC = () => (
  <Composition
    id="SkillPromo"
    component={Promo}
    durationInFrames={t.frames}
    fps={t.fps}
    width={t.width}
    height={t.height}
  />
);
