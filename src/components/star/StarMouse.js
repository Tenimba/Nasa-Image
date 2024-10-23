import React, { useEffect, useState } from 'react';
import '../../style/StarryBackground.css';

const StartMouse = ({ starSizeMin, starSizeMax, duration = 1500 }) => {
  const [stars, setStars] = useState([]);

  const handleMouseMove = (e) => {
    const { clientX: x, clientY: y } = e;
    const newStar = { x, y, id: Math.random() };
    setStars((prevStars) => [...prevStars, newStar]);

    setTimeout(() => {
      setStars((prevStars) => prevStars.filter((star) => star.id !== newStar.id));
    }, duration);
  };


  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="starry-background">
      {stars.map((star) => (
        <div
          key={star.id}
          className="nebula-star"
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
            width: `${Math.random() * (starSizeMax - starSizeMin) + starSizeMin}px`,
            height: `${Math.random() * (starSizeMax - starSizeMin) + starSizeMin}px`,
            background: `radial-gradient(circle at center, 
            rgba(255, 204, 0, 0.9) 0%, 
            rgba(255, 204, 0, 0.6) 20%, 
            rgba(30, 144, 255, 0.8) 40%, 
            rgba(165, 42, 42, 0.8) 60%, 
            transparent 80%)`,
            borderRadius: '50%',
            position: 'absolute',
            filter: 'blur(4px)',
            opacity: 0.95,
            animation: `fadeOut ${duration}ms ease-out`,
          }}
        />
      ))}
    </div>
  );
};

export default StartMouse;
