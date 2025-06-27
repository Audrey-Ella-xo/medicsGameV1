import { useState, useEffect, useCallback } from 'react';
import { clampPosition, normalizeDiagonalMovement } from '../utils/gameUtils';
import { gameConstants } from '../data/gameData';

export const useMovement = (initialPosition = { x: 50, y: 60 }) => {
  const [shipPosition, setShipPosition] = useState(initialPosition);
  const [keysPressed, setKeysPressed] = useState(new Set());
  const [isMoving, setIsMoving] = useState(false);
  const [targetPosition, setTargetPosition] = useState(null);

  // Mouse/touch movement
  const moveShipSmoothly = useCallback((targetX, targetY) => {
    setKeysPressed(new Set()); // Clear keyboard when using mouse
    setTargetPosition({ x: targetX, y: targetY });
    setIsMoving(true);
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      const validKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD'];
      if (validKeys.includes(e.code)) {
        e.preventDefault();
        setKeysPressed(prev => new Set([...prev, e.code]));
      }
    };

    const handleKeyUp = (e) => {
      setKeysPressed(prev => {
        const newKeys = new Set(prev);
        newKeys.delete(e.code);
        return newKeys;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Keyboard movement
  useEffect(() => {
    if (keysPressed.size === 0) return;

    const moveInterval = setInterval(() => {
      setShipPosition(current => {
        let deltaX = 0;
        let deltaY = 0;
        const speed = gameConstants.SHIP_SPEED;
        
        if (keysPressed.has('ArrowLeft') || keysPressed.has('KeyA')) deltaX -= speed;
        if (keysPressed.has('ArrowRight') || keysPressed.has('KeyD')) deltaX += speed;
        if (keysPressed.has('ArrowUp') || keysPressed.has('KeyW')) deltaY -= speed;
        if (keysPressed.has('ArrowDown') || keysPressed.has('KeyS')) deltaY += speed;
        
        // Normalize diagonal movement
        const normalized = normalizeDiagonalMovement(deltaX, deltaY);
        
        const newPosition = {
          x: current.x + normalized.deltaX,
          y: current.y + normalized.deltaY
        };
        
        const clampedPosition = clampPosition(newPosition);
        
        // Update movement state
        if (clampedPosition.x !== current.x || clampedPosition.y !== current.y) {
          setIsMoving(true);
          setTargetPosition(null); // Stop smooth movement
        }
        
        return clampedPosition;
      });
    }, gameConstants.ANIMATION_FRAME_RATE);

    return () => clearInterval(moveInterval);
  }, [keysPressed]);

  // Smooth movement to target
  useEffect(() => {
    if (!targetPosition || !isMoving) return;

    const moveInterval = setInterval(() => {
      setShipPosition(current => {
        const dx = targetPosition.x - current.x;
        const dy = targetPosition.y - current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 2) {
          setIsMoving(false);
          setTargetPosition(null);
          return targetPosition;
        }
        
        const speed = Math.min(distance * 0.2, 4);
        return {
          x: current.x + (dx / distance) * speed,
          y: current.y + (dy / distance) * speed
        };
      });
    }, gameConstants.ANIMATION_FRAME_RATE);

    return () => clearInterval(moveInterval);
  }, [targetPosition, isMoving]);

  const resetPosition = useCallback(() => {
    setShipPosition(initialPosition);
    setKeysPressed(new Set());
    setIsMoving(false);
    setTargetPosition(null);
  }, [initialPosition]);

  return {
    shipPosition,
    keysPressed,
    isMoving,
    moveShipSmoothly,
    resetPosition,
    setShipPosition
  };
};