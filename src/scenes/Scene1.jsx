/**
 * Scene 1: Phone floating in darkness. Neon lime pulse begins. Camera slow push in.
 * Local frames: 0-199 (runs slightly longer for cross-fade overlap)
 */
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { ParticleField } from '../components/ParticleField';
import { GridOverlay } from '../components/GridOverlay';
import { PhoneModel } from '../components/PhoneModel';
import { LensFlare } from '../components/LensFlare';

export const Scene1 = () => {
  const frame = useCurrentFrame();

  // Camera slow push in
  const scale = interpolate(frame, [0, 200], [0.85, 1.18], { extrapolateRight: 'clamp' });

  // Phone entrance
  const phoneOpacity = spring({ frame, fps: 30, from: 0, to: 1, durationInFrames: 25 });
  const phoneY = interpolate(frame, [0, 25], [40, 0], { extrapolateRight: 'clamp' });

  // Grid fade in
  const gridOpacity = interpolate(frame, [10, 80], [0, 0.1], { extrapolateRight: 'clamp' });

  // Glow intensity builds
  const glowIntensity = interpolate(frame, [0, 60, 200], [0.3, 1, 1.6], { extrapolateRight: 'clamp' });

  // Particle intensity builds
  const particleOpacity = interpolate(frame, [0, 80], [0, 0.9], { extrapolateRight: 'clamp' });

  // Lens flare appears
  const flareOpacity = interpolate(frame, [80, 140], [0, 0.45], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#000', overflow: 'hidden' }}>
      <GridOverlay opacity={gridOpacity} />

      {/* Reflective floor gradient */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: 'linear-gradient(to bottom, transparent, rgba(187,254,0,0.02))',
        }}
      />

      {/* Camera push-in transform */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${scale})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Pulse rings emanating from phone */}
        {[0, 1, 2, 3].map((i) => {
          const ringProgress = ((frame + i * 22) % 88) / 88;
          const ringSize = ringProgress * 460 + 140;
          const ringOpacity = (1 - ringProgress) * 0.5 * glowIntensity;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: ringSize,
                height: ringSize,
                borderRadius: '50%',
                border: `1px solid rgba(187,254,0,${ringOpacity})`,
                boxShadow: `0 0 14px rgba(187,254,0,${ringOpacity * 0.4})`,
              }}
            />
          );
        })}

        {/* Phone */}
        <div
          style={{
            opacity: phoneOpacity,
            transform: `translateY(${phoneY}px)`,
          }}
        >
          <PhoneModel glowIntensity={glowIntensity} />
        </div>
      </div>

      <ParticleField opacity={particleOpacity} intensity={1} />
      <LensFlare x={50} y={30} opacity={flareOpacity} />

      {/* Volumetric light ray from top */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 260,
          height: '65%',
          background: 'linear-gradient(to bottom, rgba(187,254,0,0.06), rgba(187,254,0,0.01), transparent)',
          clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)',
          opacity: interpolate(frame, [20, 100], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      />
    </AbsoluteFill>
  );
};
