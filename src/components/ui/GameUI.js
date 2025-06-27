import React from 'react';
import { medicalTools } from '../../data/gameData';
import { formatTime } from '../../utils/gameUtils';

const GameUI = ({
  stage,
  score,
  health,
  timeLeft,
  level,
  coins,
  invulnerable,
  currentTool,
  setCurrentTool,
  currentShip,
  patientVitals,
  viruses,
  keysPressed,
  onShipSelect,
  onReset
}) => {
  return (
    <>
      {/* Top UI Bar */}
      <div className="flex justify-between items-center bg-black bg-opacity-30 p-2 rounded-lg mb-2 border border-cyan-500/30">
        <div className="flex gap-2 text-xs">
          <div className="flex items-center gap-1">
            <span>⭐</span>
            <span className="text-white font-bold">{score}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>❤️</span>
            <div className={`w-12 h-2 bg-gray-700 rounded-full overflow-hidden ${
              health <= 20 ? 'ring-2 ring-red-400 animate-pulse' : ''
            }`}>
              <div 
                className={`h-full transition-all duration-500 ${
                  invulnerable ? 'bg-blue-500 animate-pulse' :
                  health > 70 ? 'bg-green-500' : 
                  health > 30 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${health}%` }}
              />
            </div>
            <span className="text-white text-xs">{health}%</span>
          </div>
          <div className="flex items-center gap-1">
            <span>⏰</span>
            <span className={`font-bold text-xs ${
              timeLeft < 30 ? 'text-red-400 animate-pulse' :
              timeLeft < 60 ? 'text-yellow-400' : 'text-white'
            }`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
        
        <div className="text-center">
          <div className={`text-sm font-bold ${
            stage.emergencyLevel === 'LEARNING' ? 'text-green-400' :
            stage.emergencyLevel === 'ROUTINE' ? 'text-blue-400' :
            'text-red-400'
          }`}>
            {stage.emergencyLevel}
          </div>
          <div className="text-gray-300 text-xs">{stage.title}</div>
        </div>
        
        <div className="flex gap-1 text-xs">
          <div className="bg-cyan-600 px-1 py-0.5 rounded">
            <div className="text-white font-bold text-xs">Lv.{level}</div>
          </div>
          <div className="bg-yellow-600 px-1 py-0.5 rounded">
            <div className="text-white font-bold text-xs">💰{coins}</div>
          </div>
          <button
            onClick={onShipSelect}
            className="bg-indigo-600 hover:bg-indigo-700 px-1 py-0.5 rounded transition-colors"
            title="Customize ship"
          >
            <div className="text-white font-bold text-xs">{currentShip}</div>
          </button>
          <button 
            className="bg-gray-600 hover:bg-gray-700 px-1 py-0.5 rounded transition-colors"
            onClick={onReset}
          >
            🔄
          </button>
        </div>
      </div>

      {/* Tool Selector */}
      <div className="bg-black bg-opacity-30 p-2 rounded-lg mb-2 border border-cyan-500/30">
        <div className="flex justify-between items-center">
          <div className="text-cyan-400 text-sm font-bold">Medical Tools:</div>
          <div className="flex gap-1">
            {Object.entries(medicalTools).map(([key, tool]) => (
              <button
                key={key}
                onClick={() => setCurrentTool(key)}
                className={`w-8 h-8 rounded-lg text-sm border-2 transition-all duration-200 ${
                  currentTool === key 
                    ? 'bg-cyan-400 text-black border-cyan-300 scale-110' 
                    : 'bg-gray-600 text-white border-gray-500 hover:bg-gray-500'
                }`}
                title={tool.name}
              >
                {tool.icon}
              </button>
            ))}
          </div>
        </div>
        <div className="text-center text-xs text-gray-300 mt-1">
          {medicalTools[currentTool].name} - {medicalTools[currentTool].description}
        </div>
      </div>

      {/* Patient Vitals */}
      <div className="bg-black bg-opacity-30 p-2 rounded-lg mb-2 border border-cyan-500/30">
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="text-center">
            <div className="text-red-400 font-bold">Heart</div>
            <div className="text-white">{Math.round(patientVitals.heartRate)}</div>
          </div>
          <div className="text-center">
            <div className="text-purple-400 font-bold">Brain</div>
            <div className="text-white">{Math.round(patientVitals.brainActivity)}%</div>
          </div>
          <div className="text-center">
            <div className="text-blue-400 font-bold">O₂</div>
            <div className="text-white">{Math.round(patientVitals.oxygenLevel)}%</div>
          </div>
          <div className="text-center">
            <div className="text-orange-400 font-bold">Stress</div>
            <div className="text-white">{Math.round(patientVitals.stress)}%</div>
          </div>
        </div>
        <div className="text-center text-xs text-gray-300 mt-1">
          🦠 Pathogens: {viruses.length} | 💡 {stage.objective}
        </div>
      </div>

      {/* Controls Guide */}
      <div className="bg-black bg-opacity-30 p-2 rounded-lg border border-cyan-500/30">
        <div className="flex justify-center items-center gap-4 text-xs text-gray-300">
          <div className="flex items-center gap-1">
            <span className="text-cyan-400 font-bold">MOVE:</span>
            <div className="flex gap-1">
              <kbd className="px-1 py-0.5 bg-gray-700 rounded text-xs">WASD</kbd>
              <span>or</span>
              <kbd className="px-1 py-0.5 bg-gray-700 rounded text-xs">↑↓←→</kbd>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-green-400 font-bold">REPAIR:</span>
            <kbd className="px-1 py-0.5 bg-gray-700 rounded text-xs">SPACE</kbd>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-yellow-400 font-bold">TARGET:</span>
            <span className="text-xs">CLICK</span>
          </div>
          {keysPressed.size > 0 && (
            <div className="flex items-center gap-1">
              <span className="text-cyan-400">⌨️</span>
              <span className="text-green-400 font-bold text-xs animate-pulse">ACTIVE</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GameUI;