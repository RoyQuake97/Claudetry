/**
 * Scene 4: Architectural visualization. Drone-style slide shot.
 * Wireframe-to-realism transition.
 * Local frames: 0-219
 */
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { ParticleField } from '../components/ParticleField';

export const Scene4 = () => {
  const frame = useCurrentFrame();

  const enterProgress = interpolate(frame, [0, 40], [0, 1], { extrapolateRight: 'clamp' });
  // Drone slide: right to left
  const slideX = interpolate(frame, [0, 220], [120, -90], { extrapolateRight: 'clamp' });
  // Wireframe to solid
  const realism = interpolate(frame, [20, 140], [0, 1], { extrapolateRight: 'clamp' });

  const wireColor = `rgba(187,254,0,${(1 - realism) * 0.85 + 0.1})`;
  const wireGlow = `0 0 ${(1 - realism) * 12}px rgba(187,254,0,0.5)`;
  const solidBg = (light) =>
    realism > 0.4
      ? `linear-gradient(145deg, #0f0f0f, ${light ? '#161616' : '#0a0a0a'})`
      : 'transparent';

  return (
    <AbsoluteFill style={{ backgroundColor: '#000', overflow: 'hidden' }}>
      {/* Sky */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(to bottom, #010801 0%, #000 55%)`,
          opacity: realism,
        }}
      />

      {/* Drone slide */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translateX(${slideX}px)`,
          opacity: enterProgress,
        }}
      >
        {/* Main tower base */}
        <div
          style={{
            position: 'absolute',
            bottom: '14%',
            left: '28%',
            width: 260,
            height: 260,
            background: solidBg(true),
            border: `${2 - realism * 1.2}px solid ${wireColor}`,
            boxShadow: wireGlow,
            overflow: 'hidden',
          }}
        >
          {/* Windows grid (appear with realism) */}
          {realism > 0.3 &&
            Array.from({ length: 5 }, (_, row) =>
              Array.from({ length: 4 }, (_, col) => (
                <div
                  key={`${row}-${col}`}
                  style={{
                    position: 'absolute',
                    left: `${8 + col * 22}%`,
                    top: `${8 + row * 18}%`,
                    width: '14%',
                    height: '12%',
                    backgroundColor: `rgba(187,254,0,${(realism - 0.3) * 0.12})`,
                    border: `1px solid rgba(187,254,0,${(realism - 0.3) * 0.25})`,
                  }}
                />
              ))
            )}
          {/* Wireframe diagonals */}
          {realism < 0.7 && (
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 1 - realism }}>
              <line x1="0%" y1="0%" x2="100%" y2="100%" stroke="#bbfe00" strokeWidth="0.5" strokeDasharray="4 8" />
              <line x1="100%" y1="0%" x2="0%" y2="100%" stroke="#bbfe00" strokeWidth="0.5" strokeDasharray="4 8" />
            </svg>
          )}
        </div>

        {/* Upper tower */}
        <div
          style={{
            position: 'absolute',
            bottom: '47%',
            left: '38%',
            width: 120,
            height: 180,
            background: solidBg(false),
            border: `${2 - realism * 1.2}px solid ${wireColor}`,
            boxShadow: wireGlow,
          }}
        />

        {/* Spire */}
        <div
          style={{
            position: 'absolute',
            bottom: '73%',
            left: '44.5%',
            width: 0,
            height: 0,
            borderLeft: '18px solid transparent',
            borderRight: '18px solid transparent',
            borderBottom: `70px solid rgba(187,254,0,${0.15 + realism * 0.1})`,
            filter: 'drop-shadow(0 0 8px rgba(187,254,0,0.4))',
            opacity: enterProgress,
          }}
        />

        {/* Secondary buildings */}
        {[
          { left: '12%', bottom: '14%', w: 110, h: 170 },
          { left: '62%', bottom: '14%', w: 90, h: 140 },
          { left: '70%', bottom: '14%', w: 70, h: 220 },
          { left: '78%', bottom: '14%', w: 55, h: 100 },
        ].map((b, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              bottom: b.bottom,
              left: b.left,
              width: b.w,
              height: b.h,
              background: solidBg(false),
              border: `1px solid rgba(187,254,0,${0.35 - realism * 0.2})`,
              boxShadow: `0 0 ${(1 - realism) * 8}px rgba(187,254,0,0.3)`,
              opacity: 0.6 + i * 0.1,
            }}
          />
        ))}

        {/* Ground plane */}
        <div
          style={{
            position: 'absolute',
            bottom: '9%',
            left: '-30%',
            right: '-30%',
            height: '6%',
            background: `linear-gradient(to bottom, rgba(187,254,0,0.04), transparent)`,
            borderTop: `1px solid rgba(187,254,0,${0.3 - realism * 0.2})`,
          }}
        />

        {/* Wireframe ground grid (fades as realism increases) */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '-30%',
            right: '-30%',
            height: '18%',
            backgroundImage: `
              linear-gradient(rgba(187,254,0,0.18) 1px, transparent 1px),
              linear-gradient(90deg, rgba(187,254,0,0.18) 1px, transparent 1px)
            `,
            backgroundSize: '44px 44px',
            opacity: (1 - realism) * enterProgress,
          }}
        />
      </div>

      {/* Cinematic vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 38%, rgba(0,0,0,0.82) 100%)',
          pointerEvents: 'none',
        }}
      />

      <ParticleField opacity={0.2} intensity={0.35} />
    </AbsoluteFill>
  );
};
