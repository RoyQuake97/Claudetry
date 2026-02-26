import { useCurrentFrame } from 'remotion';

const PARTICLE_COUNT = 50;

function seededRandom(seed) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export const ParticleField = ({ opacity = 1, intensity = 1 }) => {
  const frame = useCurrentFrame();

  const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const baseX = seededRandom(i * 1.1) * 100;
    const baseY = seededRandom(i * 2.3) * 100;
    const speed = seededRandom(i * 3.7) * 0.25 + 0.05;
    const size = seededRandom(i * 4.1) * 2.5 + 1;
    const phase = seededRandom(i * 5.9) * Math.PI * 2;

    const x = baseX + Math.sin(frame * 0.04 * speed + phase) * 3;
    const y = ((baseY - frame * speed * 0.4) % 100 + 100) % 100;
    const pulseOpacity = (Math.sin(frame * 0.08 + phase) + 1) / 2 * 0.7 + 0.3;

    return { x, y, size, op: pulseOpacity };
  });

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            backgroundColor: '#bbfe00',
            opacity: p.op * opacity * intensity,
            boxShadow: `0 0 ${p.size * 3}px rgba(187,254,0,0.8)`,
          }}
        />
      ))}
    </div>
  );
};
