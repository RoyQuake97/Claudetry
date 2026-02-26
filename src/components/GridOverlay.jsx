import { useCurrentFrame } from 'remotion';

export const GridOverlay = ({ opacity = 0.12, perspective = false }) => {
  const frame = useCurrentFrame();
  const scrollOffset = (frame * 0.5) % 80;

  const baseStyle = {
    position: 'absolute',
    inset: 0,
    opacity,
    backgroundImage: `
      linear-gradient(rgba(187,254,0,0.25) 1px, transparent 1px),
      linear-gradient(90deg, rgba(187,254,0,0.25) 1px, transparent 1px)
    `,
    backgroundSize: '80px 80px',
    backgroundPosition: `0 ${scrollOffset}px`,
  };

  if (perspective) {
    return (
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <div
          style={{
            ...baseStyle,
            transform: `perspective(600px) rotateX(55deg) translateY(${scrollOffset}px) scale(2.5)`,
            transformOrigin: '50% 100%',
            bottom: 0,
            height: '60%',
            top: 'auto',
          }}
        />
      </div>
    );
  }

  return <div style={baseStyle} />;
};
