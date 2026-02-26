/**
 * OffscriptMotion — Main composition for Offscript Motion brand video
 *
 * Timeline (30fps, 1200 frames = 40 seconds):
 *
 *  Scene 1 — Phone activation       visible: 0–200     Sequence: 0–200
 *  Scene 2 — Luxury product          visible: 160–440   Sequence: 160–460
 *  Scene 3 — Political rally         visible: 400–640   Sequence: 400–660
 *  Scene 4 — Architecture            visible: 600–820   Sequence: 600–840
 *  Scene 5 — Return to phone         visible: 780–1000  Sequence: 780–1020
 *  Final   — Logo + tagline          visible: 960–1200  Sequence: 960–1200
 *
 *  Cross-fade duration: FADE = 40 frames
 */

import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from 'remotion';
import { Scene1 } from './scenes/Scene1';
import { Scene2 } from './scenes/Scene2';
import { Scene3 } from './scenes/Scene3';
import { Scene4 } from './scenes/Scene4';
import { Scene5 } from './scenes/Scene5';
import { FinalFrame } from './scenes/FinalFrame';

const FADE = 40;

// Returns opacity value given the composition-level frame
// fadeInStart: when scene starts fading in (0 → 1)
// fadeOutStart: when scene starts fading out (1 → 0)
function sceneOpacity(frame, fadeInStart, fadeOutStart) {
  return interpolate(
    frame,
    [fadeInStart, fadeInStart + FADE, fadeOutStart, fadeOutStart + FADE],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
}

export const OffscriptMotion = () => {
  const frame = useCurrentFrame();

  // Visibility windows (when opacity > 0)
  const s1op = sceneOpacity(frame, 0, 160);
  const s2op = sceneOpacity(frame, 160, 400);
  const s3op = sceneOpacity(frame, 400, 600);
  const s4op = sceneOpacity(frame, 600, 780);
  const s5op = sceneOpacity(frame, 780, 960);
  const sfop = sceneOpacity(frame, 960, 1200);

  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      {/* Scene 1: Phone Activation — 0s to ~6.7s */}
      {s1op > 0 && (
        <div style={{ position: 'absolute', inset: 0, opacity: s1op }}>
          <Sequence from={0} durationInFrames={240}>
            <Scene1 />
          </Sequence>
        </div>
      )}

      {/* Scene 2: Luxury Product — ~5.3s to ~14.7s */}
      {s2op > 0 && (
        <div style={{ position: 'absolute', inset: 0, opacity: s2op }}>
          <Sequence from={160} durationInFrames={320}>
            <Scene2 />
          </Sequence>
        </div>
      )}

      {/* Scene 3: Political Rally — ~13.3s to ~21.3s */}
      {s3op > 0 && (
        <div style={{ position: 'absolute', inset: 0, opacity: s3op }}>
          <Sequence from={400} durationInFrames={280}>
            <Scene3 />
          </Sequence>
        </div>
      )}

      {/* Scene 4: Architecture — ~20s to ~28s */}
      {s4op > 0 && (
        <div style={{ position: 'absolute', inset: 0, opacity: s4op }}>
          <Sequence from={600} durationInFrames={260}>
            <Scene4 />
          </Sequence>
        </div>
      )}

      {/* Scene 5: Return to Phone — ~26s to ~33.3s */}
      {s5op > 0 && (
        <div style={{ position: 'absolute', inset: 0, opacity: s5op }}>
          <Sequence from={780} durationInFrames={260}>
            <Scene5 />
          </Sequence>
        </div>
      )}

      {/* Final Frame: Logo + Tagline — ~32s to 40s */}
      {sfop > 0 && (
        <div style={{ position: 'absolute', inset: 0, opacity: sfop }}>
          <Sequence from={960} durationInFrames={240}>
            <FinalFrame />
          </Sequence>
        </div>
      )}
    </AbsoluteFill>
  );
};
