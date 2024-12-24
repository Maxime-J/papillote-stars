import { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload, CameraControls } from '@react-three/drei';

function Stars() {
  const ref = useRef();

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 8]}>
      <Points ref={ref} positions={window.papillote}>
        <PointMaterial
          transparent
          color='white'
          size={0.001}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

function StarsCanvas({ callback }) {
  const [frameloop, setFrameloop] = useState('always');
  const cc = useRef();

  const stop = () => {
    setFrameloop('never');
  };

  const run = () => {
    setFrameloop('always');
  };

  const zoomIn = () => {
    cc.current.dollyTo(0.5, true);
    cc.current.enabled = true;
    cc.current.dispose();
  };

  useEffect(() => {
    callback({ zoomIn, stop, run });
  }, []);

  return (
    <Canvas camera={{ position: [0, 0, 5] }} frameloop={frameloop} dpr={[1, 2]}>
      <Suspense fallback={null}>
        <Stars />
        <CameraControls ref={cc} enabled={false} smoothTime={0.5} />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default StarsCanvas;
