import React from 'react';
import ShipSelector from '../ui/ShipSelector';

const IntroScreen = ({
  level,
  xp,
  coins,
  currentShip,
  unlockedShips,
  showShipSelector,
  setShowShipSelector,
  setCurrentShip,
  setUnlockedShips,
  setCoins,
  onStartGame
}) => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-900 via-purple-700 to-indigo-900 flex items-center justify-center p-4 overflow-y-auto">
      <div className="text-center max-w-4xl w-full">
        <div className="flex items-center justify-center mb-6">
          <span className="text-6xl mr-3 animate-pulse">🧠</span>
          <h1 className="text-4xl font-bold text-cyan-400 font-mono">Micro Medics</h1>
        </div>
        
        <div className="bg-black bg-opacity-40 p-4 rounded-xl mb-6 border border-cyan-500/30">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-gradient-to-br from-cyan-600 to-blue-600 p-3 rounded-lg">
              <div className="text-cyan-300 text-sm">Level</div>
              <div className="text-white text-xl font-bold">{level}</div>
              <div className="text-cyan-200 text-xs">{xp} XP</div>
            </div>
            <div className="bg-gradient-to-br from-green-600 to-emerald-600 p-3 rounded-lg">
              <div className="text-green-300 text-sm">Coins</div>
              <div className="text-white text-xl font-bold">{coins}</div>
              <div className="text-green-200 text-xs">💰 Available</div>
            </div>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(xp % 100)}%` }}
            />
          </div>
          <div className="text-cyan-300 text-xs">Progress to Level {level + 1}</div>
        </div>
        
        <div className="bg-black bg-opacity-30 p-4 rounded-lg mb-6">
          <h2 className="text-2xl font-bold text-green-400 mb-3">🏥 Neural Surgery Simulator</h2>
          <p className="text-gray-300 text-sm mb-4">
            Navigate your nano-ship through the brain, repair damaged neurons, and eliminate pathogens! 
            Use keyboard (WASD/Arrows) or touch controls. Learn real brain science while saving lives! 🌟
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto mb-6">
          <div className="bg-green-900 bg-opacity-50 p-3 rounded-lg border border-green-400">
            <div className="text-lg mb-1">⌨️</div>
            <div className="font-bold text-green-300 text-sm">Keyboard</div>
            <div className="text-xs text-gray-400">WASD or Arrow Keys</div>
          </div>
          
          <div className="bg-blue-900 bg-opacity-50 p-3 rounded-lg border border-blue-400">
            <div className="text-lg mb-1">📱</div>
            <div className="font-bold text-blue-300 text-sm">Touch</div>
            <div className="text-xs text-gray-400">Tap & Drag</div>
          </div>
          
          <div className="bg-purple-900 bg-opacity-50 p-3 rounded-lg border border-purple-400">
            <div className="text-lg mb-1">🚀</div>
            <div className="font-bold text-purple-300 text-sm">Ships</div>
            <div className="text-xs text-gray-400">8 Unlockable</div>
          </div>
          
          <div className="bg-yellow-900 bg-opacity-50 p-3 rounded-lg border border-yellow-400">
            <div className="text-lg mb-1">🧠</div>
            <div className="font-bold text-yellow-300 text-sm">Brain Science</div>
            <div className="text-xs text-gray-400">Educational Facts</div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            onClick={onStartGame}
          >
            🌟 Start Healing
          </button>
          
          <button
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            onClick={() => setShowShipSelector(true)}
          >
            🚀 Customize Ship
          </button>
        </div>

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
      </div>
    </div>
  );
};

export default IntroScreen;