/**
 * Final Frame: Black screen. OFFSCRIPT MOTION logo glowing in neon lime.
 * Tagline: "We don't shoot content. We orchestrate perception."
 * Local frames: 0-279
 */
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';

export const FinalFrame = () => {
  const frame = useCurrentFrame();

  // Logo entrance
  const logoOpacity = spring({ frame, fps: 30, from: 0, to: 1, durationInFrames: 45 });
  const logoY = interpolate(frame, [0, 45], [20, 0], { extrapolateRight: 'clamp' });

  // Divider line extends
  const lineWidth = interpolate(frame, [40, 90], [0, 520], { extrapolateRight: 'clamp' });

  // Tagline fades
  const taglineOpacity = interpolate(frame, [80, 120], [0, 1], { extrapolateRight: 'clamp' });

  // Pulsing glow on logo
  const glowPulse = (Math.sin(frame * 0.09) + 1) / 2 * 0.35 + 0.65;
  const glowSize = 24 * glowPulse;

  // Scan line (subtle CRT effect)
  const scanY = (frame * 1.8) % 108 - 4;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Subtle scan line */}
      <div
        style={{
          position: 'absolute',
          top: `${scanY}%`,
          left: 0,
          right: 0,
          height: 2,
          background: 'linear-gradient(90deg, transparent 5%, rgba(187,254,0,0.12) 50%, transparent 95%)',
          pointerEvents: 'none',
        }}
      />

      {/* Very faint radial glow behind logo */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700,
          height: 300,
          background: `radial-gradient(ellipse, rgba(187,254,0,${0.04 * glowPulse}) 0%, transparent 65%)`,
          opacity: logoOpacity,
        }}
      />

      {/* Logo block */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `translateY(${logoY}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0,
        }}
      >
        {/* OFFSCRIPT */}
        <div
          style={{
            color: '#bbfe00',
            fontSize: 86,
            fontWeight: 900,
            fontFamily: '"Arial Black", "Arial", sans-serif',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            lineHeight: 1,
            textShadow: `
              0 0 ${glowSize}px rgba(187,254,0,0.9),
              0 0 ${glowSize * 2}px rgba(187,254,0,0.5),
              0 0 ${glowSize * 4}px rgba(187,254,0,0.2)
            `,
          }}
        >
          OFFSCRIPT
        </div>

        {/* MOTION */}
        <div
          style={{
            color: '#bbfe00',
            fontSize: 86,
            fontWeight: 900,
            fontFamily: '"Arial Black", "Arial", sans-serif',
            letterSpacing: '0.38em',
            textTransform: 'uppercase',
            lineHeight: 1,
            marginTop: -6,
            textShadow: `
              0 0 ${glowSize}px rgba(187,254,0,0.9),
              0 0 ${glowSize * 2}px rgba(187,254,0,0.5),
              0 0 ${glowSize * 4}px rgba(187,254,0,0.2)
            `,
          }}
        >
          MOTION
        </div>
      </div>

      {/* Neon divider line */}
      <div
        style={{
          width: lineWidth,
          height: 1,
          backgroundColor: '#bbfe00',
          boxShadow: '0 0 8px rgba(187,254,0,0.8), 0 0 18px rgba(187,254,0,0.3)',
          marginTop: 22,
          marginBottom: 24,
        }}
      />

      {/* Tagline */}
      <div
        style={{
          opacity: taglineOpacity,
          color: 'rgba(187,254,0,0.7)',
          fontSize: 22,
          fontFamily: '"Georgia", "Times New Roman", serif',
          fontStyle: 'italic',
          letterSpacing: '0.06em',
          textAlign: 'center',
          maxWidth: 720,
          textShadow: '0 0 12px rgba(187,254,0,0.25)',
          lineHeight: 1.5,
        }}
      >
        "We don't shoot content. We orchestrate perception."
      </div>
    </AbsoluteFill>
  );
};
