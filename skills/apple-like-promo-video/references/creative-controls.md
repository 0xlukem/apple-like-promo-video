# Creative controls and proposals

Read this during the embedded interview before recommending a direction, and when
feedback changes the creative settings. Use [direction.md](direction.md) for the
gesture catalog, image-motion requirements, and editorial review.

## Adjustable direction

<!-- public-guide:start -->
These controls are creative instructions on a 1–10 scale, not trained model
weights, probabilities, quality scores, or exact render settings. They guide the
agent's proposals. Start with an energetic, high-impact direction when the brief
does not specify otherwise; adapt it to the subject, audience, and available assets.

| Control | Baseline | Lower: 1–3 | Middle: 4–7 | Higher: 8–10 |
| --- | --- | --- | --- | --- |
| **Motion impact** (`motion_impact`) | **8** | Restrained travel; one deliberate reveal and a clear hold | Noticeable scale/depth changes and controlled settling | Bold scale contrast, decisive reveals, and memorable transformations with readable arrivals |
| **Typography prominence** (`typography_prominence`) | **8** | Supporting labels; product or visual evidence leads | Headlines share attention with the subject | Giant hero words and letter choreography own selected beats |
| **Editing pace** (`editing_pace`) | **7** | Longer shots and pauses for discovery | Alternating active passages and reading holds | Shorter shots and rapid sequences, with essential reading time preserved |
| **Visual density** (`visual_density`) | **3** | One dominant element with generous negative space | A hero plus a few supporting elements | Layered evidence or detail, introduced in a clear order around one focal point |
| **Color expressiveness** (`color_expressiveness`) | **6** | Neutrals or restrained brand color | Selective accents and controlled color changes | Vivid contrast, animated gradients, or bold color transitions within the chosen identity |
| **Sound energy** (`sound_energy`) | **8** | Sparse cues, space, and a restrained arrangement | Rhythmic support with selected accents | Driving rhythm, stronger arrangement contrast, and emphatic synchronized events |

Impact is independent of speed: a slow reveal can have high impact. Sound energy
is independent of loudness and does not prescribe BPM. Typography prominence
changes attention, not word count. Every featured image still needs authored
motion; lower settings allow restraint, not generic static slides. Intentional
holds give the active moments contrast. Brand constraints and explicit requests
take precedence over these starting values.

### Direction recipes

Choose one dominant direction and borrow compatible gestures from another. These
recipes describe an emphasis, not mutually exclusive categories or fixed shot lists.

| Direction | Best suited to | Typical proposal | Starting changes to the baseline |
| --- | --- | --- | --- |
| **Cinematic product** | A product whose form, material, interface, or detail sells the benefit | Detail-to-object reveal, controlled light/depth, product-led framing, tactile sound | Typography **5**, editing pace **5**, sound energy **7** |
| **Kinetic typography** | A short, strong message that benefits from words performing | Hero-word takeovers, masked transitions, letter choreography, rhythmic accents | Motion impact **9**, typography **9**, editing pace **8**, color **7** |
| **Visible transformation** | A benefit that can be demonstrated through a change or comparison | Preserve the subject through a before/after, reveal the improvement, then land the claim | Typography **6**, visual density **4** |

The unchanged controls retain their baseline values. Recipe settings are initial
proposals; explicit user settings win. Borrowing a secondary gesture does not
average the recipes or reset the chosen controls. A transformation can, for
example, be presented with cinematic product shots and one kinetic headline.

### Natural language or direct adjustment

You can describe the feeling, set individual values, or combine both:

- “Make it more elegant and paused, but keep the product reveal powerful.”
- “Use motion impact 8 and editing pace 4; keep the other agreed settings.”
- “Let the product lead. Use giant type only for the main benefit.”
- “Give the music more drive without increasing the playback volume.”

The agent translates the request into a proposed direction and records the
settings and their visible/audible consequences in the production plan. You can
adjust them in conversation without editing a skill file. Numerical adjustments
remain available alongside natural-language questions; neither is required to use
the other. Settings guide the film as a whole, with documented exceptions for
specific beats such as a deliberately flat before-state or a quiet ending.
<!-- public-guide:end -->

## Interview and selection procedure

1. Recover the user's existing concept, constraints, settings, and scope of
   delegation. Ask natural-language questions about consequential gaps in short
   numbered rounds, each with a recommendation and reason. Inspect resource facts
   yourself. Ask downstream questions after their prerequisites are answered.
2. Determine the dominant benefit and what can demonstrate it. Helpful questions
   include “What should viewers remember: the product, the claim, or the change?”
   and “Should the reveal feel controlled and spacious, or sudden and explosive?”
   Use these when unresolved, not as a questionnaire to repeat verbatim.
3. Follow the applicable proposal branch:
   - **Missing or ambiguous direction:** present two concrete, contrasting routes
     suited to this subject. Recommend one and explain the tradeoff. Missing
     animation references trigger suggestions from direction.md, not a request
     that the user design the film.
   - **A clear supplied concept:** develop that concept with compatible treatments;
     offer alternatives only for a consequential unresolved choice.
   - **Full creative delegation:** choose and explain one coherent direction.
     Preserve the agreed storyboard review. Partial delegation settles only the
     named choices, such as animation or music; ask about unrelated open choices.
4. For each proposed route, supply the sales idea, dominant recipe and compatible
   secondary treatment, representative scene descriptions with sample copy,
   motion and sound, and resource requirements. Explain how a featured image
   changes, why that change matters, and where it resolves into a legible state.
   Differentiate routes through narrative or choreography, not just palette swaps.
5. Offer numerical adjustment alongside the natural-language proposal. Record
   all six selected values and their provenance (explicit, inferred proposal, or
   delegated choice) in the production plan. Explain consequential changes in
   ordinary language; do not make six sliders another mandatory interview round.
6. Close once consequential choices are answered or delegated. Carry the selected
   direction into the storyboard review specified by SKILL.md. Existing approval
   counts; corrections reopen only the affected choices.

## Calibration and resource fit

Apply precedence in this order: explicit user constraints/settings → the message,
available resources, and destination → selected dominant recipe → baseline.
Use the recipe's starting changes only for unspecified controls. If explicit
requests conflict or a requested move exceeds asset capabilities, explain the
concrete conflict and propose a feasible choice rather than silently overriding it.

The recipes have different production implications:

- **Cinematic product:** inspect image resolution, crops, cutouts, footage, or
  geometry. A true turn exposing new surfaces needs an actual model or suitable
  multi-view footage. With a single photo, propose an authored cutout/mask/depth
  reveal it can support, or agree on creating the missing asset. Do not fake a
  3D-capability claim. Space and tactile sound can coexist with a high-impact reveal.
- **Kinetic typography:** choose concise copy, usable fonts, and readable holds.
  Use visual product evidence where the message needs it; a high typography value
  does not turn every brief into an all-text film. Select related sonic accents
  instead of an identical hit for every letter.
- **Visible transformation:** obtain comparable states of the same subject and
  truthful benefit evidence. Agree on mockups when needed and identify them as
  such. Match framing and continuity so the improvement reads; an arbitrary
  recoloring alone may not demonstrate the claimed benefit. Let the musical
  arrangement change with the transformation where appropriate.

Lower editing pace does not automatically lower motion impact. Higher sound
energy can come from articulation, arrangement, or rhythm without raising gain.
Choose actual durations, easing, colors, BPM, and mix targets through the approved
storyboard and sound direction, not a numeric conversion formula.

## Validate decisions, not numbers

For each major beat, compare the intended consequence against the actual result:
dominant element, visible motion change, resolved state, reading time, and sonic
role. For example, impact 8 with pace 4 should show a powerful reveal that has time
to register, not fast cuts inserted to satisfy the impact value. Report perceptual
review gaps honestly under the existing review workflow.

When feedback changes a control, record the before/after value, the reason, and
the affected scenes; update their animation and sound decisions together. Preserve
unaffected choices. Adjust this project's direction rather than silently changing
the skill's global defaults. User feedback can justify later skill revisions when
the user requests them.
