import React, { useRef, useEffect } from 'react';
import Ship from './Ship';
import Neuron from './Neuron';
import Virus from './Virus';
import Particle from './Particle';
import VisualFeedback from './VisualFeedback';
import { calculateDistance } from '../../utils/gameUtils';

const GameArea = ({
  stage,
  shipPosition,
  currentShip,
  shipTrail,
  repairedNeurons,
  viruses,
  particles,
  visualFeedback,
  currentTool,
  keysPressed,
  isMoving,
  invulnerable,
  gameStarted,
  timeLeft,
  health,
  onAreaClick,
  onNeuronRepair,
  setViruses,
  setShipTrail
}) => {
  const gameAreaRef = useRef(null);

  const handleClick = (e) => {
    if (!gameStarted) return;
    
    const rect = gameAreaRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    const boundedX = Math.max(8, Math.min(92, x));
    const boundedY = Math.max(8, Math.min(92, y));
    
    onAreaClick(boundedX, boundedY);
  };

  // Update virus behavior
  useEffect(() => {
    if (!gameStarted) return;

    const updateVirusesInterval = setInterval(() => {
      setViruses(prev => prev.map(virus => {
        const distToShip = calculateDistance(virus, shipPosition);
        
        let newX = virus.x;
        let newY = virus.y;
        let newDirection = virus.direction;
        let isHunting = virus.isHunting;
        
        // Hunt player if close
        if (!isHunting && distToShip < 35) {
          isHunting = true;
        }
        
        if (isHunting) {
          const angleToShip = Math.atan2(shipPosition.y - virus.y, shipPosition.x - virus.x) * 180 / Math.PI;
          newDirection = angleToShip;
          if (distToShip > 60) isHunting = false;
        } else {
          if (Math.random() < 0.02) {
            newDirection += (Math.random() - 0.5) * 45;
          }
        }
        
        const speed = isHunting ? virus.speed * 1.5 : virus.speed;
        newX += Math.cos(newDirection * Math.PI / 180) * speed;
        newY += Math.sin(newDirection * Math.PI / 180) * speed;
        
        // Bounce off walls
        if (newX < 5 || newX > 95) {
          newDirection = 180 - newDirection;
          newX = Math.max(5, Math.min(95, newX));
        }
        if (newY < 5 || newY > 95) {
          newDirection = -newDirection;
          newY = Math.max(5, Math.min(95, newY));
        }
        
        return {
          ...virus,
          x: newX,
          y: newY,
          direction: newDirection,
          isHunting,
          lifespan: virus.lifespan - 1
        };
      }).filter(v => v.lifespan > 0));
    }, 100);

    return () => clearInterval(updateVirusesInterval);
  }, [gameStarted, shipPosition, setViruses]);

  // Update ship trail
  useEffect(() => {
    if (isMoving) {
      setShipTrail(prev => [...prev.slice(-4), {
        x: shipPosition.x,
        y: shipPosition.y,
        opacity: 1,
        color: '#60a5fa'
      }]);
    }
  }, [shipPosition, isMoving, setShipTrail]);

  return (
    <div 
      ref={gameAreaRef}
      className={`game-area relative bg-black bg-opacity-20 border-2 rounded-2xl overflow-hidden transition-all duration-300 border-cyan-400 border-opacity-40 ${
        invulnerable ? 'ring-4 ring-blue-300 ring-opacity-50' : ''
      }`}
      style={{ touchAction: 'manipulation' }}
      onClick={handleClick}
      tabIndex={0}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#06b6d4" strokeWidth="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Time Warning */}
      {timeLeft <= 30 && timeLeft > 0 && gameStarted && (
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-yellow-600 text-black px-3 py-1 rounded-lg text-center animate-bounce z-40">
          <div className="text-sm font-bold">⏰ TIME LOW!</div>
        </div>
      )}

      {/* Critical Health Warning */}
      {health <= 20 && health > 0 && gameStarted && (
        <div className="absolute inset-0 border-4 border-red-500 rounded-2xl animate-pulse pointer-events-none z-40">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white px-3 py-1 rounded-lg text-center">
            <div className="text-sm font-bold">⚠️ CRITICAL HEALTH!</div>
          </div>
        </div>
      )}

      {/* Game Elements */}
      {shipTrail.map((point, index) => (
        <div
          key={index}
          className="absolute w-3 h-3 rounded-full pointer-events-none"
          style={{
            left: `${point.x}%`,
            top: `${point.y}%`,
            backgroundColor: point.color,
            opacity: point.opacity * 0.6,
            transform: 'translate(-50%, -50%)',
            zIndex: 35,
            boxShadow: `0 0 8px ${point.color}`
          }}
        />
      ))}

      {visualFeedback.map(feedback => (
        <VisualFeedback key={feedback.id} feedback={feedback} />
      ))}

      {particles.map(particle => (
        <Particle key={particle.id} particle={particle} />
      ))}

      {stage.neurons.map(neuron => (
        <Neuron
          key={neuron.id}
          neuron={neuron}
          isRepaired={repairedNeurons.has(neuron.id)}
          isOptimal={neuron.repairType === currentTool}
          onRepair={onNeuronRepair}
        />
      ))}

      {viruses.map(virus => (
        <Virus key={virus.id} virus={virus} />
      ))}

      <Ship
        position={shipPosition}
        ship={currentShip}
        isMoving={isMoving}
        invulnerable={invulnerable}
        keysPressed={keysPressed}
      />

      {/* Controls Hint */}
      {gameStarted && keysPressed.size === 0 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-lg text-xs z-30">
          🎮 Use WASD/Arrows to move, SPACE to repair, click to target!
        </div>
      )}
    </div>
  );
};

export default GameArea;