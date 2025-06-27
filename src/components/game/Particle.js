import React from 'react';

const Particle = ({ particle }) => {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        backgroundColor: particle.color,
        opacity: particle.life / 60,
        transform: 'translate(-50%, -50%)',
        zIndex: 30,
        width: `${particle.size}px`,
        height: `${particle.size}px`,
      }}
    />
  );
};

export default Particle;