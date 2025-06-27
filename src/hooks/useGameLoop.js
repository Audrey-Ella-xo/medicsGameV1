import { useState, useEffect, useRef, useCallback } from 'react';
import { gameConstants } from '../data/gameData';

export const useGameLoop = (gameStarted, gameState) => {
  const [particles, setParticles] = useState([]);
  const [visualFeedback, setVisualFeedback] = useState([]);
  const gameLoopRef = useRef(null);

  const updateParticles = useCallback(() => {
    setParticles(prev => prev
      .map(p => ({
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy,
        life: p.life - 1,
        vx: p.vx * 0.98,
        vy: p.vy * 0.98
      }))
      .filter(p => p.life > 0)
    );
  }, []);

  const updateVisualFeedback = useCallback(() => {
    setVisualFeedback(prev => prev
      .map(f => ({
        ...f,
        y: f.y + f.vy,
        life: f.life - 1
      }))
      .filter(f => f.life > 0)
    );
  }, []);

  const gameLoop = useCallback(() => {
    updateParticles();
    updateVisualFeedback();
  }, [updateParticles, updateVisualFeedback]);

  const createExplosion = useCallback((x, y, color, intensity = 12) => {
    const newParticles = [];
    for (let i = 0; i < intensity; i++) {
      newParticles.push({
        id: Math.random(),
        x, y,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        life: 60,
        color,
        size: Math.random() * 4 + 2
      });
    }
    setParticles(prev => [...prev.slice(-40), ...newParticles]);
  }, []);

  const addVisualFeedback = useCallback((text, x, y, color = '#00ff00') => {
    const feedback = {
      id: Date.now() + Math.random(),
      text, x, y, color,
      life: 60, vy: -1
    };
    setVisualFeedback(prev => [...prev.slice(-8), feedback]);
  }, []);

  // Game loop runner
  useEffect(() => {
    if (gameStarted && gameState === 'playing') {
      gameLoopRef.current = setInterval(gameLoop, gameConstants.GAME_LOOP_RATE);
    }
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameStarted, gameState, gameLoop]);

  const resetGameLoop = useCallback(() => {
    setParticles([]);
    setVisualFeedback([]);
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }
  }, []);

  return {
    particles,
    visualFeedback,
    createExplosion,
    addVisualFeedback,
    resetGameLoop
  };
};

export const useGameTimer = (gameStarted, gameState, onTimeWarning) => {
  const [timeLeft, setTimeLeft] = useState(300);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!gameStarted || gameState !== 'playing') return;
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1;
        if (newTime === 30) {
          onTimeWarning("⏰ 30 seconds left!");
        } else if (newTime === 10) {
          onTimeWarning("⏰ 10 seconds remaining!");
        } else if (newTime <= 0) {
          onTimeWarning("⏰ Time's up! But take your time to finish.");
          return 0;
        }
        return newTime;
      });
    }, 1000);
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [gameStarted, gameState, onTimeWarning]);

  const resetTimer = useCallback((newTime = 300) => {
    setTimeLeft(newTime);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, []);

  return { timeLeft, resetTimer, setTimeLeft };
};