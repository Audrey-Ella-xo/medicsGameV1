import React from 'react';

const Ship = ({ position, ship, isMoving, invulnerable, keysPressed }) => {
  return (
    <div
      className="absolute z-40 transition-all duration-300 ease-out"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <span className={`text-3xl drop-shadow-lg ${
        isMoving ? 'animate-pulse' : ''
      } ${invulnerable ? 'text-blue-400 animate-pulse' : ''}`}>
        {ship}
      </span>
      
      {/* Keyboard indicators */}
      {keysPressed.size > 0 && (
        <>
          {(keysPressed.has('ArrowUp') || keysPressed.has('KeyW')) && (
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-cyan-400 text-xs animate-bounce">▲</div>
          )}
          {(keysPressed.has('ArrowDown') || keysPressed.has('KeyS')) && (
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-cyan-400 text-xs animate-bounce">▼</div>
          )}
          {(keysPressed.has('ArrowLeft') || keysPressed.has('KeyA')) && (
            <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 text-cyan-400 text-xs animate-bounce">◀</div>
          )}
          {(keysPressed.has('ArrowRight') || keysPressed.has('KeyD')) && (
            <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 text-cyan-400 text-xs animate-bounce">▶</div>
          )}
        </>
      )}
      
      {invulnerable && (
        <div className="absolute rounded-full border-2 border-blue-300 opacity-50 animate-ping"
             style={{ width: '60px', height: '60px', left: '-15px', top: '-15px' }}>
        </div>
      )}
    </div>
  );
};

export default Ship;