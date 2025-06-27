import React, { useEffect, useCallback } from 'react';
import GameUI from '../ui/GameUI';
import GameArea from '../game/GameArea';
import ShipSelector from '../ui/ShipSelector';
import HintMessage from '../ui/HintMessage';
import PatientMessage from '../ui/PatientMessage';
import BrainFact from '../ui/BrainFact';
import StageCompleteModal from '../ui/StageCompleteModal';
import { stages, medicalTools, virusTypes } from '../../data/gameData';
import { calculateDistance, generateRandomPosition, generateId } from '../../utils/gameUtils';
import { triggerHaptic } from '../../utils/gameUtils';

const GameScreen = ({
  // Game state props
  currentStage, score, health, timeLeft, level, coins, combo, invulnerable,
  currentTool, gameStarted, currentHint, showStageComplete, showFact,
  screenShake, currentShip, unlockedShips, showShipSelector, shipTrail,
  repairedNeurons, viruses, patientVitals, showPatientMessage,
  particles, visualFeedback, shipPosition, keysPressed, isMoving, achievements,
  
  // Setters
  setCurrentTool, setShowShipSelector, setCurrentShip, setUnlockedShips,
  setCoins, setScore, setHealth, setCombo, setInvulnerable,
  setRepairedNeurons, setViruses, setPatientVitals, setShipTrail,
  setScreenShake, setGameState, setShowStageComplete, setXp, setAchievements,
  setShowPatientMessage, setShowFact,
  
  // Functions
  moveShipSmoothly, createExplosion, addVisualFeedback, showHint,
  resetGame, nextStage
}) => {
  const stage = stages[currentStage];

  // === VIRUS CREATION ===
  const createVirus = useCallback((index) => {
    const types = Object.keys(virusTypes);
    const type = types[Math.floor(Math.random() * types.length)];
    const data = virusTypes[type];
    
    const position = generateRandomPosition(shipPosition, 30);
    
    return {
      id: generateId('virus'),
      x: position.x,
      y: position.y,
      speed: data.speed,
      direction: Math.random() * 360,
      type,
      data,
      isHunting: false,
      lifespan: 300,
      health: data.health
    };
  }, [shipPosition]);

  // === NEURON REPAIR LOGIC ===
  const repairNeuron = useCallback((neuron) => {
    if (repairedNeurons.has(neuron.id)) return;
    
    setRepairedNeurons(prev => new Set([...prev, neuron.id]));
    
    const tool = medicalTools[currentTool];
    const isOptimal = neuron.repairType === currentTool;
    const effectiveness = isOptimal ? 1.5 : 1.0;
    
    // Update vitals
    setPatientVitals(prev => ({
      ...prev,
      brainActivity: Math.min(100, prev.brainActivity + 5),
      stress: Math.max(0, prev.stress - 8)
    }));
    
    // Scoring
    const newCombo = combo + 1;
    setCombo(newCombo);
    const points = Math.floor(100 * effectiveness * newCombo);
    setScore(prev => prev + points);
    setXp(prev => prev + Math.floor(25 * effectiveness));
    setCoins(prev => prev + Math.floor(newCombo * 2 + 3));
    
    // Effects
    createExplosion(neuron.x, neuron.y, tool.color, 15);
    addVisualFeedback(`+${points}`, neuron.x, neuron.y - 5, '#4ade80');
    if (isOptimal) {
      addVisualFeedback('PERFECT!', neuron.x, neuron.y - 15, '#fbbf24');
    }
    if (newCombo > 1) {
      addVisualFeedback(`${newCombo}x COMBO!`, neuron.x, neuron.y + 10, '#ff6b6b');
    }
    
    triggerHaptic('repair');
    
    setTimeout(() => setCombo(0), 5000);
    
    // Check achievements
    if (!achievements.has('first_repair')) {
      setAchievements(prev => new Set([...prev, 'first_repair']));
      showHint("🏆 Achievement: First Repair!");
    }
  }, [repairedNeurons, currentTool, combo, achievements, createExplosion, 
      addVisualFeedback, setRepairedNeurons, setPatientVitals, setCombo, 
      setScore, setXp, setCoins, setAchievements, showHint]);

  // === GAME AREA CLICK HANDLER ===
  const handleGameAreaClick = useCallback((x, y) => {
    if (!gameStarted) return;
    
    // Check virus elimination
    let virusEliminated = false;
    viruses.forEach(virus => {
      const distance = calculateDistance({ x, y }, virus);
      
      if (distance < 15) {
        if (currentTool === virus.data.weakness) {
          setViruses(prev => prev.filter(v => v.id !== virus.id));
          createExplosion(virus.x, virus.y, '#4ade80', 20);
          addVisualFeedback('VIRUS ELIMINATED!', virus.x, virus.y, '#4ade80');
          setScore(prev => prev + 200);
          setCoins(prev => prev + 10);
          triggerHaptic('achievement');
          showHint(`🎉 ${virus.data.name} eliminated!`);
          virusEliminated = true;
        } else {
          addVisualFeedback('WRONG TOOL!', virus.x, virus.y, '#ff6666');
          showHint(`❌ Use ${medicalTools[virus.data.weakness].name}!`);
        }
      }
    });
    
    if (!virusEliminated) {
      moveShipSmoothly(x, y);
    }
    
    // Check neuron repair
    stage.neurons.forEach(neuron => {
      if (repairedNeurons.has(neuron.id)) return;
      const distance = calculateDistance({ x, y }, neuron);
      if (distance < 18) {
        repairNeuron(neuron);
      }
    });
  }, [gameStarted, viruses, currentTool, stage.neurons, repairedNeurons, 
      setViruses, createExplosion, addVisualFeedback, setScore, setCoins,
      showHint, moveShipSmoothly, repairNeuron]);

  // === SPACEBAR REPAIR ===
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameStarted) return;
      if (e.code === 'Space') {
        e.preventDefault();
        stage.neurons.forEach(neuron => {
          if (repairedNeurons.has(neuron.id)) return;
          const distance = calculateDistance(shipPosition, neuron);
          if (distance < 25) {
            repairNeuron(neuron);
          }
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted, shipPosition, stage.neurons, repairedNeurons, repairNeuron]);

  // === COLLISION DETECTION ===
  useEffect(() => {
    if (!gameStarted || invulnerable) return;
    
    const checkCollisions = () => {
      viruses.forEach(virus => {
        const distance = calculateDistance(virus, shipPosition);
        
        if (distance < 12) {
          const damage = virus.isHunting ? 20 : 15;
          setHealth(prev => {
            const newHealth = Math.max(0, prev - damage);
            if (newHealth <= 0) {
              setGameState('gameover');
            }
            return newHealth;
          });
          
          setPatientVitals(prev => ({
            ...prev,
            brainActivity: Math.max(0, prev.brainActivity - 3),
            stress: Math.min(100, prev.stress + 10)
          }));
          
          addVisualFeedback(`-${damage} HEALTH!`, shipPosition.x, shipPosition.y, '#ff4444');
          createExplosion(virus.x, virus.y, '#ff4444', 20);
          triggerHaptic('damage');
          
          setScreenShake(2);
          setTimeout(() => setScreenShake(0), 300);
          
          setViruses(prev => prev.filter(v => v.id !== virus.id));
          setInvulnerable(true);
          setTimeout(() => setInvulnerable(false), 2000);
          
          showHint(`🦠 ${virus.data.name} hit! Use ${medicalTools[virus.data.weakness].name}!`);
        }
      });
    };
    
    const interval = setInterval(checkCollisions, 100);
    return () => clearInterval(interval);
  }, [gameStarted, invulnerable, viruses, shipPosition, setHealth, setPatientVitals,
      addVisualFeedback, createExplosion, setScreenShake, setViruses, setInvulnerable,
      setGameState, showHint]);

  // === STAGE COMPLETION CHECK ===
  useEffect(() => {
    if (!gameStarted) return;
    const allRepaired = stage.neurons.every(neuron => repairedNeurons.has(neuron.id));
    if (allRepaired && !showStageComplete) {
      setShowStageComplete(true);
      triggerHaptic('achievement');
      showHint("🎉 All neurons repaired! Patient saved!");
    }
  }, [repairedNeurons, gameStarted, stage.neurons, showStageComplete, 
      setShowStageComplete, showHint]);

  // === VIRUS SPAWNING ===
  useEffect(() => {
    if (!gameStarted) return;
    
    // Spawn initial viruses
    setTimeout(() => {
      const newViruses = [];
      for (let i = 0; i < Math.min(2, stage.maxViruses); i++) {
        newViruses.push(createVirus(i));
      }
      setViruses(newViruses);
      showHint("🦠 Pathogens detected! Avoid them or eliminate with correct tools!");
    }, 3000);
  }, [gameStarted, stage.maxViruses, createVirus, setViruses, showHint]);

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-700 to-indigo-900 p-2"
      style={{ 
        transform: screenShake ? `translate(${(Math.random() - 0.5) * screenShake}px, ${(Math.random() - 0.5) * screenShake}px)` : 'none',
        transition: screenShake ? 'none' : 'transform 0.1s'
      }}
    >
      <GameUI
        stage={stage}
        score={score}
        health={health}
        timeLeft={timeLeft}
        level={level}
        coins={coins}
        invulnerable={invulnerable}
        currentTool={currentTool}
        setCurrentTool={setCurrentTool}
        currentShip={currentShip}
        patientVitals={patientVitals}
        viruses={viruses}
        keysPressed={keysPressed}
        onShipSelect={() => setShowShipSelector(true)}
        onReset={resetGame}
      />

      {currentHint && <HintMessage message={currentHint} />}
      {showPatientMessage && <PatientMessage message={showPatientMessage} />}
      {showFact && <BrainFact fact={showFact} />}

      <GameArea
        stage={stage}
        shipPosition={shipPosition}
        currentShip={currentShip}
        shipTrail={shipTrail}
        repairedNeurons={repairedNeurons}
        viruses={viruses}
        particles={particles}
        visualFeedback={visualFeedback}
        currentTool={currentTool}
        keysPressed={keysPressed}
        isMoving={isMoving}
        invulnerable={invulnerable}
        gameStarted={gameStarted}
        timeLeft={timeLeft}
        health={health}
        onAreaClick={handleGameAreaClick}
        onNeuronRepair={repairNeuron}
        setViruses={setViruses}
        setShipTrail={setShipTrail}
      />

      {showShipSelector && (
        <ShipSelector
          currentShip={currentShip}
          unlockedShips={unlockedShips}
          coins={coins}
          setCurrentShip={setCurrentShip}
          setUnlockedShips={setUnlockedShips}
          setCoins={setCoins}
          onClose={() => setShowShipSelector(false)}
        />
      )}

      {showStageComplete && (
        <StageCompleteModal
          stage={stage}
          currentStage={currentStage}
          onNext={nextStage}
        />
      )}
    </div>
  );
};

export default GameScreen;