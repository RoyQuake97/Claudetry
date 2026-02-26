/**
 * Scene 3: Political campaign rally. Confident speaker. Cinematic depth of field.
 * Neon energy lines guiding composition.
 * Local frames: 0-219
 */
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { ParticleField } from '../components/ParticleField';
import { LensFlare } from '../components/LensFlare';

export const Scene3 = () => {
  const frame = useCurrentFrame();

  const enterProgress = interpolate(frame, [0, 35], [0, 1], { extrapolateRight: 'clamp' });
  const dofBlur = interpolate(frame, [0, 35], [8, 0], { extrapolateRight: 'clamp' });

  // Subtle camera drift
  const cameraX = Math.sin(frame * 0.015) * 8;

  return (
    <AbsoluteFill style={{ backgroundColor: '#000', overflow: 'hidden' }}>
      {/* Atmospheric bg */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: enterProgress,
          background: `
            radial-gradient(ellipse at 42% 38%, rgba(187,254,0,0.07) 0%, transparent 45%),
            radial-gradient(ellipse at 60% 85%, rgba(187,254,0,0.03) 0%, transparent 35%)
          `,
        }}
      />

      {/* Camera drift */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translateX(${cameraX}px)`,
          filter: `blur(${dofBlur}px)`,
          opacity: enterProgress,
        }}
      >
        {/* Stage spotlight beam */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 320,
            height: '72%',
            background: 'linear-gradient(to bottom, rgba(187,254,0,0.09), rgba(187,254,0,0.03), transparent)',
            clipPath: 'polygon(28% 0%, 72% 0%, 100% 100%, 0% 100%)',
          }}
        />

        {/* Speaker silhouette */}
        <div
          style={{
            position: 'absolute',
            bottom: '18%',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Head */}
          <div
            style={{
              width: 52,
              height: 58,
              borderRadius: '50% 50% 44% 44%',
              backgroundColor: '#0e0e0e',
              border: '1px solid rgba(187,254,0,0.3)',
              boxShadow: '0 0 18px rgba(187,254,0,0.18), 0 0 40px rgba(187,254,0,0.06)',
              marginBottom: -6,
              position: 'relative',
              zIndex: 2,
            }}
          />

          {/* Neck */}
          <div
            style={{
              width: 22,
              height: 16,
              backgroundColor: '#0c0c0c',
              marginBottom: -4,
              position: 'relative',
              zIndex: 2,
            }}
          />

          {/* Shoulders + torso */}
          <div
            style={{
              width: 170,
              height: 210,
              borderRadius: '32px 32px 8px 8px',
              background: 'linear-gradient(175deg, #111, #0a0a0a)',
              border: '1px solid rgba(187,254,0,0.12)',
              boxShadow: '0 0 28px rgba(187,254,0,0.08)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Suit center line */}
            <div
              style={{
                position: 'absolute',
                top: 12,
                left: '50%',
                width: 1,
                height: 130,
                backgroundColor: 'rgba(187,254,0,0.15)',
              }}
            />
            {/* Lapel highlights */}
            <div
              style={{
                position: 'absolute',
                top: 12,
                left: '30%',
                width: 1,
                height: 70,
                backgroundColor: 'rgba(187,254,0,0.1)',
                transform: 'rotate(-15deg)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 12,
                right: '30%',
                width: 1,
                height: 70,
                backgroundColor: 'rgba(187,254,0,0.1)',
                transform: 'rotate(15deg)',
              }}
            />
            {/* Mic at podium */}
            <div
              style={{
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 2,
                height: 30,
                backgroundColor: 'rgba(187,254,0,0.25)',
                boxShadow: '0 0 4px rgba(187,254,0,0.3)',
              }}
            />
          </div>
        </div>

        {/* Podium */}
        <div
          style={{
            position: 'absolute',
            bottom: '12%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 130,
            height: 40,
            background: 'linear-gradient(to bottom, #111, #080808)',
            border: '1px solid rgba(187,254,0,0.2)',
            borderRadius: '4px 4px 0 0',
            boxShadow: '0 0 14px rgba(187,254,0,0.1)',
          }}
        />

        {/* Crowd silhouettes */}
        {Array.from({ length: 32 }, (_, i) => {
          const col = i % 16;
          const row = Math.floor(i / 16);
          const x = 2 + col * 6.1;
          const y = 83 + row * 9 + (col % 2) * 3;
          const h = 25 + (col % 3) * 5;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${x}%`,
                bottom: `${100 - y - 5}%`,
                width: 16,
                height: h,
                backgroundColor: '#080808',
                borderRadius: '40% 40% 0 0',
                border: '1px solid rgba(187,254,0,0.06)',
                opacity: 0.7 + (col % 3) * 0.1,
              }}
            />
          );
        })}
      </div>

      {/* Neon energy guide lines (SVG) */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: enterProgress * 0.45,
        }}
      >
        <line x1="0%" y1="60%" x2="43%" y2="33%" stroke="#bbfe00" strokeWidth="1" strokeDasharray="6 10" style={{ filter: 'drop-shadow(0 0 3px #bbfe00)' }} />
        <line x1="57%" y1="33%" x2="100%" y2="60%" stroke="#bbfe00" strokeWidth="1" strokeDasharray="6 10" style={{ filter: 'drop-shadow(0 0 3px #bbfe00)' }} />
        <line x1="5%" y1="82%" x2="95%" y2="82%" stroke="#bbfe00" strokeWidth="1" strokeDasharray="3 6" style={{ filter: 'drop-shadow(0 0 2px #bbfe00)' }} />
      </svg>

      {/* Cinematic depth vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 42%, transparent 22%, rgba(0,0,0,0.65) 85%)',
          pointerEvents: 'none',
        }}
      />

      <LensFlare x={50} y={12} opacity={0.28 * enterProgress} />
      <ParticleField opacity={0.25} intensity={0.45} />
    </AbsoluteFill>
  );
};
