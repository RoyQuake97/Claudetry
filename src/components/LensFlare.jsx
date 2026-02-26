import { useCurrentFrame } from 'remotion';

export const LensFlare = ({ x = 50, y = 30, opacity = 0.5 }) => {
  const frame = useCurrentFrame();
  const pulse = (Math.sin(frame * 0.14) + 1) / 2 * 0.3 + 0.7;

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {/* Core bloom */}
      <div
        style={{
          position: 'absolute',
          left: `${x}%`,
          top: `${y}%`,
          transform: 'translate(-50%, -50%)',
          width: 160,
          height: 160,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(187,254,0,0.7) 0%, rgba(187,254,0,0.2) 30%, transparent 65%)',
          opacity: opacity * pulse,
          filter: 'blur(4px)',
        }}
      />
      {/* Outer halo */}
      <div
        style={{
          position: 'absolute',
          left: `${x}%`,
          top: `${y}%`,
          transform: 'translate(-50%, -50%)',
          width: 380,
          height: 380,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(187,254,0,0.12) 0%, transparent 60%)',
          opacity: opacity * pulse,
        }}
      />
      {/* Horizontal streak */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: `${y}%`,
          height: 1,
          background: `linear-gradient(90deg, transparent 0%, transparent ${x - 20}%, rgba(187,254,0,0.6) ${x}%, transparent ${x + 20}%, transparent 100%)`,
          opacity: opacity * pulse * 0.6,
          filter: 'blur(1px)',
        }}
      />
      {/* Vertical streak */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${x}%`,
          width: 1,
          background: `linear-gradient(180deg, transparent 0%, transparent ${y - 15}%, rgba(187,254,0,0.4) ${y}%, transparent ${y + 15}%, transparent 100%)`,
          opacity: opacity * pulse * 0.4,
          filter: 'blur(1px)',
        }}
      />
    </div>
  );
};
