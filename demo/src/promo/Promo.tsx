import { AbsoluteFill, Sequence, useCurrentFrame, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { ProductStage } from "./ProductStage";
import { Interruption, HeroType } from "./scenes/TypeScenes";
import { AnimatedWord } from "./scenes/AnimatedWord";
import { CodeScene } from "./scenes/CodeScene";
import { Intro } from "./scenes/Intro";
import t from "./timeline.json";

export const Promo: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        background: "#050506",
        fontFamily: "Inter",
        fontWeight: 800,
        color: "#f7f6f2",
      }}
    >
      <Audio src={staticFile("promo/music.wav")} />
      <Audio src={staticFile("promo/sound-design.wav")} />
      <ProductStage frame={f} />
      <ProductStage frame={f} flat />
      <Sequence durationInFrames={t.xStart} name="Boring promo">
        <Intro />
      </Sequence>
      <Sequence
        from={t.xStart}
        durationInFrames={t.phraseStart - t.xStart}
        name="Interruption"
      >
        <Interruption frame={f} />
      </Sequence>
      <Sequence
        from={t.phraseStart}
        durationInFrames={t.insteadStart - t.phraseStart}
        name="Use this skill"
      >
        <HeroType
          frame={f}
          start={t.phraseStart}
          arrival={t.phraseArrival}
          text={
            <>
              Use this
              <br />
              <AnimatedWord
                text="skill"
                frame={f}
                start={t.phraseArrival}
                mode="sway"
              />
            </>
          }
        />
      </Sequence>
      <Sequence
        from={t.insteadStart}
        durationInFrames={t.codeStart - t.insteadStart}
        name="Instead"
      >
        <HeroType
          frame={f}
          start={t.insteadStart}
          arrival={t.insteadArrival}
          text={
            <AnimatedWord
              text="instead."
              frame={f}
              start={t.insteadStart}
              mode="punch"
              dark
            />
          }
          size={375}
          light
          zoom
        />
      </Sequence>
      <Sequence
        from={t.codeStart}
        durationInFrames={t.heroStart - t.codeStart}
        name="Code becomes motion"
      >
        <CodeScene frame={f} />
      </Sequence>
      <Sequence
        from={t.heroStart}
        durationInFrames={t.macroStart - t.heroStart}
        name="Pulse product name"
      >
        <div
          style={{
            position: "absolute",
            left: 128,
            top: 430,
            fontSize: 126,
            letterSpacing: -7,
            opacity: Math.max(0, Math.min(1, (f - t.heroStart - 9) / 12)),
            translate: `${Math.max(0, 1 - (f - t.heroStart - 9) / 18) * -100}px 0`,
          }}
        >
          Pulse.
        </div>
      </Sequence>
      <Sequence
        from={t.sameStart}
        durationInFrames={t.comparisonStart - t.sameStart}
        name="Same product"
      >
        <HeroType
          frame={f}
          start={t.sameStart}
          arrival={t.sameStart + 7}
          text="Same product."
          size={230}
          light
        />
      </Sequence>
      <Sequence
        from={t.impactStart}
        durationInFrames={t.ctaStart - t.impactStart}
        name="Different impact"
      >
        <HeroType
          frame={f}
          start={t.impactStart}
          arrival={t.impactStart + 9}
          text={
            <>
              Different
              <br />
              <AnimatedWord
                text="impact."
                frame={f}
                start={t.impactStart + 7}
                mode="sway"
              />
            </>
          }
          size={320}
        />
      </Sequence>
      <Sequence
        from={t.ctaStart}
        durationInFrames={t.frames - t.ctaStart}
        name="Invitation"
      >
        <HeroType
          frame={f}
          start={t.ctaStart}
          arrival={t.ctaArrival}
          text={
            <>
              Try the{" "}
              <AnimatedWord
                text="skill."
                frame={f}
                start={t.ctaFall}
                mode="tumble"
                dark
              />
            </>
          }
          size={270}
          light
        />
      </Sequence>
    </AbsoluteFill>
  );
};
