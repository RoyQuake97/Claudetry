/**
 * Scene 5: Cut back to phone. Energy stabilizes. Logo appears.
 * Local frames: 0-219
 */
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { ParticleField } from '../components/ParticleField';
import { GridOverlay } from '../components/GridOverlay';
import { PhoneModel } from '../components/PhoneModel';
import { LensFlare } from '../components/LensFlare';

export const Scene5 = () => {
  const frame = useCurrentFrame();

  const phoneIn = spring({ frame, fps: 30, from: 0, to: 1, durationInFrames: 28 });
  const phoneY = interpolate(frame, [0, 28], [30, 0], { extrapolateRight: 'clamp' });

  // Energy stabilizing: glow intensifies then settles
  const glowIntensity = interpolate(frame, [0, 40, 100, 220], [2.2, 2.8, 1.4, 1.0], { extrapolateRight: 'clamp' });

  // Particles fade out as energy settles
  const particleOpacity = interpolate(frame, [60, 180], [0.9, 0.2], { extrapolateRight: 'clamp' });

  // Rings converging inward
  const ringConverge = interpolate(frame, [0, 120], [1, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#000', overflow: 'hidden' }}>
      <GridOverlay opacity={0.07} />

      {/* Converging energy rings */}
      {[0, 1, 2, 3, 4].map((i) => {
        const baseSize = 300 + i * 120;
        const size = baseSize * (0.4 + ringConverge * 0.6) + i * 20 * ringConverge;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: size,
              height: size,
              borderRadius: '50%',
              border: `1px solid rgba(187,254,0,${(0.06 + i * 0.04) * (1 + ringConverge * 0.5)})`,
              boxShadow: `0 0 ${8 + i * 3}px rgba(187,254,0,${0.04 * ringConverge})`,
            }}
          />
        );
      })}

      {/* Phone */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: phoneIn,
          transform: `translateY(${phoneY}px)`,
        }}
      >
        <PhoneModel glowIntensity={glowIntensity} />
      </div>

      {/* Volumetric light */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 280,
          height: '60%',
          background: 'linear-gradient(to bottom, rgba(187,254,0,0.08), rgba(187,254,0,0.01), transparent)',
          clipPath: 'polygon(28% 0%, 72% 0%, 100% 100%, 0% 100%)',
          opacity: interpolate(frame, [0, 60], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      />

      <ParticleField opacity={particleOpacity} intensity={0.8} />
      <LensFlare x={50} y={28} opacity={0.4} />
    </AbsoluteFill>
  );
};
