import React from 'react';
import StarryBackground from './star/StarBackground';
import StartMouse from './star/StarMouse';

const StarryScene = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
      <StarryBackground />
      <StartMouse starSizeMin={10} starSizeMax={20} />
    </div>
  );
};

export default StarryScene;
