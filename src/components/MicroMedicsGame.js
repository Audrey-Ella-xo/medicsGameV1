import React, { useState, useCallback } from 'react';
import IntroScreen from './screens/IntroScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import CompleteScreen from './screens/CompleteScreen';
import { useMovement } from '../hooks/useMovement';
import { useGameLoop, useGameTimer } from '../hooks/useGameLoop';
import { triggerHaptic } from '../utils/gameUtils';

const MicroMedicsGame = () => {
  // === CORE GAME STATE ===
  const [gameState, setGameState] = useState('intro');
  const [currentStage, setCurrentStage] = useState(1);
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(100);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [coins, setCoins] = useState(150);
  
  // === GAMEPLAY STATE ===
  const [repairedNeurons, setRepairedNeurons] = useState(new Set());
  const [viruses, setViruses] = useState([]);
  const [powerUps, setPowerUps] = useState([]);
  const [combo, setCombo] = useState(0);
  const [invulnerable, setInvulnerable] = useState(false);
  const [currentTool, setCurrentTool] = useState('basic');
  
  // === UI STATE ===
  const [gameStarted, setGameStarted] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [showStageComplete, setShowStageComplete] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [showFact, setShowFact] = useState(null);
  const [screenShake, setScreenShake] = useState(0);
  
  // === SHIP CUSTOMIZATION ===
  const [currentShip, setCurrentShip] = useState('🚀');
  const [unlockedShips, setUnlockedShips] = useState(['🚀']);
  const [showShipSelector, setShowShipSelector] = useState(false);
  const [shipTrail, setShipTrail] = useState([]);
  
  // === PATIENT/MEDICAL STATE ===
  const [patientVitals, setPatientVitals] = useState({
    heartRate: 72,
    brainActivity: 85,
    oxygenLevel: 98,
    stress: 30
  });
  const [showPatientMessage, setShowPatientMessage] = useState(null);
  const [achievements, setAchievements] = useState(new Set());

  // === CUSTOM HOOKS ===
  const movement = useMovement({ x: 50, y: 60 });
  const gameLoop = useGameLoop(gameStarted, gameState);
  
  const showHint = useCallback((message, duration = 4000) => {
    setCurrentHint(message);
    setTimeout(() => setCurrentHint(''), duration);
  }, []);

  const timer = useGameTimer(gameStarted, gameState, (message) => {
    showHint(message);
    triggerHaptic('damage');
  });

  // === GAME CONTROL FUNCTIONS ===
  const startGame = useCallback(() => {
    setGameState('playing');
    setGameStarted(true);
    showHint("🎯 Repair all neurons while avoiding pathogens! Use WASD or arrow keys to move!");
  }, [showHint]);

  const resetGame = useCallback(() => {
    setGameState('intro');
    setCurrentStage(1);
    setScore(0);
    setHealth(100);
    setRepairedNeurons(new Set());
    setCombo(0);
    setViruses([]);
    setPowerUps([]);
    setGameStarted(false);
    setShowStageComplete(false);
    setCurrentHint('');
    setShipTrail([]);
    movement.resetPosition();
    gameLoop.resetGameLoop();
    timer.resetTimer();
  }, [movement, gameLoop, timer]);

  const nextStage = useCallback(() => {
    setCoins(prev => prev + 50);
    setScore(prev => prev + 500);
    setShowStageComplete(false);
    
    if (currentStage < 3) {
      setCurrentStage(currentStage + 1);
      setRepairedNeurons(new Set());
      setCombo(0);
      setGameStarted(false);
      
      setTimeout(() => {
        setGameStarted(true);
      }, 2000);
    } else {
      setGameState('complete');
    }
  }, [currentStage]);

  // === RENDER BASED ON GAME STATE ===
  switch (gameState) {
    case 'intro':
      return (
        <IntroScreen
          level={level}
          xp={xp}
          coins={coins}
          currentShip={currentShip}
          unlockedShips={unlockedShips}
          showShipSelector={showShipSelector}
          setShowShipSelector={setShowShipSelector}
          setCurrentShip={setCurrentShip}
          setUnlockedShips={setUnlockedShips}
          setCoins={setCoins}
          onStartGame={startGame}
        />
      );
    
    case 'playing':
      return (
        <GameScreen
          // Game state
          currentStage={currentStage}
          score={score}
          health={health}
          timeLeft={timer.timeLeft}
          level={level}
          coins={coins}
          combo={combo}
          invulnerable={invulnerable}
          currentTool={currentTool}
          gameStarted={gameStarted}
          currentHint={currentHint}
          showStageComplete={showStageComplete}
          showFact={showFact}
          screenShake={screenShake}
          currentShip={currentShip}
          unlockedShips={unlockedShips}
          showShipSelector={showShipSelector}
          shipTrail={shipTrail}
          repairedNeurons={repairedNeurons}
          viruses={viruses}
          patientVitals={patientVitals}
          showPatientMessage={showPatientMessage}
          
          // Game loop state
          particles={gameLoop.particles}
          visualFeedback={gameLoop.visualFeedback}
          
          // Movement state
          shipPosition={movement.shipPosition}
          keysPressed={movement.keysPressed}
          isMoving={movement.isMoving}
          
          // Setters
          setCurrentTool={setCurrentTool}
          setShowShipSelector={setShowShipSelector}
          setCurrentShip={setCurrentShip}
          setUnlockedShips={setUnlockedShips}
          setCoins={setCoins}
          setScore={setScore}
          setHealth={setHealth}
          setCombo={setCombo}
          setInvulnerable={setInvulnerable}
          setRepairedNeurons={setRepairedNeurons}
          setViruses={setViruses}
          setPatientVitals={setPatientVitals}
          setShipTrail={setShipTrail}
          setScreenShake={setScreenShake}
          setGameState={setGameState}
          setShowStageComplete={setShowStageComplete}
          setXp={setXp}
          setAchievements={setAchievements}
          setShowPatientMessage={setShowPatientMessage}
          setShowFact={setShowFact}
          
          // Functions
          moveShipSmoothly={movement.moveShipSmoothly}
          createExplosion={gameLoop.createExplosion}
          addVisualFeedback={gameLoop.addVisualFeedback}
          showHint={showHint}
          resetGame={resetGame}
          nextStage={nextStage}
          
          // Achievements
          achievements={achievements}
        />
      );
    
    case 'gameover':
      return (
        <GameOverScreen
          score={score}
          currentStage={currentStage}
          onTryAgain={() => {
            setGameState('playing');
            setHealth(100);
            setGameStarted(true);
          }}
          onMainMenu={resetGame}
        />
      );
    
    case 'complete':
      return (
        <CompleteScreen
          score={score}
          coins={coins}
          onPlayAgain={resetGame}
        />
      );
    
    default:
      return null;
  }
};

export default MicroMedicsGame;