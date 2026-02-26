import { Composition } from 'remotion';
import { HelloWorld } from './HelloWorld';
import { OffscriptMotion } from './OffscriptMotion';

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="OffscriptMotion"
        component={OffscriptMotion}
        durationInFrames={1200}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
