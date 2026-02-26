import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

export const HelloWorld = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const opacity = interpolate(frame, [0, fps], [0, 1], { extrapolateRight: 'clamp' });
  const scale = interpolate(frame, [0, fps], [0.5, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0b84f3',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          color: 'white',
          fontSize: 80,
          fontWeight: 'bold',
          fontFamily: 'sans-serif',
          textAlign: 'center',
        }}
      >
        Hello, Remotion!
        <div style={{ fontSize: 30, marginTop: 20, opacity: 0.8 }}>
          Frame {frame} / {durationInFrames}
        </div>
      </div>
    </AbsoluteFill>
  );
};
