# Promo demo

[Watch the video](skill-promo.mp4).

A 25-second, 1920 × 1080, 30 FPS promo showing a flat monochrome advertisement
becoming an energetic product film. It combines kinetic typography, animated
source code, a fictional speaker with a 180-degree entrance turn, and original
144 BPM music with synchronized effects. There is no voiceover.

## Preview and render

From this directory:

```sh
npm ci
npm run dev
```

To check the source and export the video:

```sh
npm run lint
npm run render
```

The render writes `skill-promo.mp4`. Included audio is ready to use.

## Edit the demo

- `src/promo/timeline.json`: shared timing for animation and sound.
- `src/promo/scenes/`: typography, source-code scene, and opening composition.
- `src/promo/Product.tsx` and `ProductStage.tsx`: speaker geometry and presentation.
- `public/promo/music.wav` and `sound-design.wav`: separate original stereo stems.
- `scripts/extract-source.mjs`: extracts the displayed code from `ProductStage.tsx`.
  It runs automatically before preview and render.

To regenerate the audio, install the Python dependencies in your chosen environment:

```sh
python3 -m pip install -r requirements-audio.txt
npm run audio
```

The audio generator reads the shared timeline and uses seeded synthesis without
external samples or services. Rendering mixes the two stems directly.

## Resources

Pulse is a fictional speaker built from procedural Three.js geometry. Both the
monochrome and colored versions use the same model. No hardware performance
claims are made. The score and effects are synthesized by the included script.
Inter and IBM Plex Mono come from their Fontsource packages, which include the
font licenses. Dependencies retain their respective licenses.
