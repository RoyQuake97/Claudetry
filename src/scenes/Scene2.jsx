/**
 * Scene 2: Luxury product ad. Particles form product shape. Orbit shot. Grid dissolves.
 * Local frames: 0-299
 */
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { ParticleField } from '../components/ParticleField';
import { LensFlare } from '../components/LensFlare';

export const Scene2 = () => {
  const frame = useCurrentFrame();

  // Product forms from particles
  const formProgress = interpolate(frame, [0, 70], [0, 1], { extrapolateRight: 'clamp' });

  // Grid dissolve
  const gridOpacity = interpolate(frame, [0, 60], [0.25, 0], { extrapolateRight: 'clamp' });

  // Slow orbit: camera translates around product
  const orbitX = Math.sin((frame / 280) * Math.PI * 2) * 55;
  const orbitZ = Math.cos((frame / 280) * Math.PI * 2) * 0.06;

  // Depth of field blur edges
  const dofBlur = interpolate(frame, [0, 40], [6, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#000', overflow: 'hidden' }}>
      {/* Atmospheric bg */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 55%, rgba(187,254,0,0.05) 0%, transparent 65%)',
        }}
      />

      {/* Dissolving grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: gridOpacity,
          backgroundImage: `linear-gradient(rgba(187,254,0,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(187,254,0,0.2) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Camera orbit transform */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translateX(${orbitX}px) perspective(1200px) rotateY(${orbitZ * 10}deg)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          filter: `blur(${dofBlur}px)`,
        }}
      >
        {/* Luxury perfume bottle */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            opacity: formProgress,
            transform: `scale(${0.4 + formProgress * 0.6})`,
          }}
        >
          {/* Cap */}
          <div
            style={{
              width: 56,
              height: 28,
              borderRadius: '6px 6px 0 0',
              background: 'linear-gradient(135deg, #1c1c1c, #0a0a0a)',
              border: '1px solid rgba(187,254,0,0.7)',
              boxShadow: '0 0 12px rgba(187,254,0,0.25)',
              marginBottom: -1,
            }}
          />

          {/* Neck */}
          <div
            style={{
              width: 32,
              height: 22,
              background: 'linear-gradient(to bottom, #161616, #0d0d0d)',
              border: '1px solid rgba(187,254,0,0.5)',
              marginBottom: -1,
            }}
          />

          {/* Main bottle body */}
          <div
            style={{
              width: 100,
              height: 260,
              borderRadius: '6px 6px 12px 12px',
              background: 'linear-gradient(145deg, #111 0%, #080808 50%, rgba(187,254,0,0.06) 100%)',
              border: '1px solid rgba(187,254,0,0.8)',
              boxShadow: `
                0 0 30px rgba(187,254,0,0.25),
                0 0 60px rgba(187,254,0,0.1),
                inset 1px 0 0 rgba(187,254,0,0.15),
                inset -1px 0 0 rgba(187,254,0,0.05)
              `,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Glass shine */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 6,
                width: 12,
                bottom: 0,
                background: 'linear-gradient(to right, transparent, rgba(187,254,0,0.06), transparent)',
              }}
            />

            {/* Label area */}
            <div
              style={{
                position: 'absolute',
                top: '30%',
                left: 12,
                right: 12,
                bottom: '25%',
                border: '1px solid rgba(187,254,0,0.2)',
                borderRadius: 2,
              }}
            />

            {/* Decorative horizontal lines */}
            {[65, 85, 200, 220].map((top, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top,
                  left: 12,
                  right: 12,
                  height: 1,
                  backgroundColor: `rgba(187,254,0,${i < 2 ? 0.45 : 0.2})`,
                  boxShadow: i < 2 ? '0 0 5px rgba(187,254,0,0.3)' : 'none',
                }}
              />
            ))}
          </div>

          {/* Reflection */}
          <div
            style={{
              width: 100,
              height: 60,
              background: 'linear-gradient(to bottom, rgba(187,254,0,0.04), transparent)',
              transform: 'scaleY(-0.35)',
              transformOrigin: 'top',
              filter: 'blur(2px)',
              opacity: 0.6,
            }}
          />
        </div>
      </div>

      {/* Neon energy composition lines */}
      {[
        { y: 25, xStart: 0, xEnd: 40 },
        { y: 25, xStart: 60, xEnd: 100 },
        { y: 80, xStart: 0, xEnd: 100 },
      ].map(({ y, xStart, xEnd }, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: `${y}%`,
            left: `${xStart}%`,
            right: `${100 - xEnd}%`,
            height: 1,
            background: `linear-gradient(90deg, transparent, rgba(187,254,0,0.25), transparent)`,
            opacity: formProgress * 0.7,
          }}
        />
      ))}

      {/* Depth vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.75) 100%)',
          pointerEvents: 'none',
        }}
      />

      <ParticleField opacity={0.45} intensity={0.7} />
      <LensFlare x={72} y={28} opacity={0.35 * formProgress} />
    </AbsoluteFill>
  );
};
