import { useCurrentFrame, interpolate } from 'remotion';

export const PhoneModel = ({ glowIntensity = 1 }) => {
  const frame = useCurrentFrame();

  const float = Math.sin(frame * 0.05) * 12;
  const tilt = Math.sin(frame * 0.03) * 3;
  const glowSize = (18 + Math.sin(frame * 0.08) * 8) * glowIntensity;
  const screenPulse = (Math.sin(frame * 0.12) + 1) / 2;

  return (
    <div
      style={{
        position: 'relative',
        width: 190,
        height: 370,
        transform: `translateY(${float}px) rotate(${tilt}deg)`,
      }}
    >
      {/* Outer glow */}
      <div
        style={{
          position: 'absolute',
          inset: -30,
          borderRadius: 50,
          background: `radial-gradient(ellipse, rgba(187,254,0,${0.12 * glowIntensity}) 0%, transparent 70%)`,
          filter: `blur(20px)`,
        }}
      />

      {/* Phone body */}
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#0a0a0a',
          borderRadius: 32,
          border: `1.5px solid rgba(187,254,0,${0.5 + screenPulse * 0.3 * glowIntensity})`,
          boxShadow: `
            0 0 ${glowSize}px rgba(187,254,0,0.35),
            0 0 ${glowSize * 2}px rgba(187,254,0,0.15),
            0 0 ${glowSize * 4}px rgba(187,254,0,0.05),
            inset 0 0 30px rgba(187,254,0,0.04)
          `,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Dynamic island / notch */}
        <div
          style={{
            position: 'absolute',
            top: 18,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 65,
            height: 9,
            backgroundColor: '#000',
            borderRadius: 5,
          }}
        />

        {/* Screen glow */}
        <div
          style={{
            position: 'absolute',
            top: 14,
            left: 8,
            right: 8,
            bottom: 14,
            borderRadius: 22,
            background: `radial-gradient(ellipse at 50% 40%, rgba(187,254,0,${0.08 + screenPulse * 0.06 * glowIntensity}), transparent 70%)`,
          }}
        />

        {/* UI lines */}
        {[60, 115, 145, 175, 220, 260].map((top, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: i % 2 === 0 ? 22 : 35,
              right: i % 2 === 0 ? 22 : 50,
              top,
              height: i < 2 ? 2 : 1,
              backgroundColor: '#bbfe00',
              borderRadius: 1,
              opacity: (0.15 + (i < 2 ? 0.25 : 0.08)) * glowIntensity,
              boxShadow: i < 2 ? '0 0 4px rgba(187,254,0,0.5)' : 'none',
            }}
          />
        ))}

        {/* Small square UI elements */}
        {[{ top: 58, left: 22, size: 38 }, { top: 110, left: 22, size: 28 }].map((el, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: el.top,
              left: el.left,
              width: el.size,
              height: el.size,
              border: `1px solid rgba(187,254,0,${0.2 * glowIntensity})`,
              borderRadius: 4,
            }}
          />
        ))}

        {/* Bottom home indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: 10,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 60,
            height: 3,
            backgroundColor: 'rgba(187,254,0,0.3)',
            borderRadius: 2,
          }}
        />
      </div>

      {/* Reflective floor shadow */}
      <div
        style={{
          position: 'absolute',
          top: '100%',
          left: '10%',
          right: '10%',
          height: 60,
          background: 'linear-gradient(to bottom, rgba(187,254,0,0.08), transparent)',
          transform: 'scaleY(-0.5)',
          transformOrigin: 'top',
          filter: 'blur(8px)',
          opacity: glowIntensity * 0.5,
        }}
      />
    </div>
  );
};
