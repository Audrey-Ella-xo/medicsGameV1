import React from 'react';
import { availableShips } from '../../data/gameData';
import { triggerHaptic } from '../../utils/gameUtils';

const ShipSelector = ({
  currentShip,
  unlockedShips,
  coins,
  setCurrentShip,
  setUnlockedShips,
  setCoins,
  onClose
}) => {
  const selectShip = (shipEmoji) => {
    const shipData = availableShips[shipEmoji];
    if (!shipData) return;

    if (unlockedShips.includes(shipEmoji)) {
      setCurrentShip(shipEmoji);
      onClose();
      triggerHaptic('achievement');
    } else if (coins >= shipData.cost || shipData.cost === 0) {
      if (shipData.cost > 0) {
        setCoins(prev => prev - shipData.cost);
      }
      setUnlockedShips(prev => [...prev, shipEmoji]);
      setCurrentShip(shipEmoji);
      onClose();
      triggerHaptic('achievement');
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[100]"
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-br from-purple-800 to-blue-800 p-4 rounded-xl border-2 border-purple-400 text-center max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-3xl mb-2">🚀</div>
        <h2 className="text-xl font-bold text-purple-300 mb-3">Choose Your Nano-Ship</h2>
        
        <div className="grid grid-cols-2 gap-3 mb-3">
          {Object.entries(availableShips).map(([shipEmoji, shipData]) => {
            const isUnlocked = unlockedShips.includes(shipEmoji);
            const canAfford = coins >= shipData.cost;
            const isCurrent = currentShip === shipEmoji;
            
            return (
              <div
                key={shipEmoji}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                  isCurrent ? 'border-yellow-400 bg-yellow-400 bg-opacity-20' :
                  isUnlocked ? 'border-green-400 bg-green-400 bg-opacity-10 hover:bg-opacity-20' :
                  canAfford ? 'border-blue-400 bg-blue-400 bg-opacity-10 hover:bg-opacity-20' :
                  'border-gray-600 bg-gray-600 bg-opacity-10 opacity-75'
                }`}
                onClick={() => selectShip(shipEmoji)}
              >
                <div className="text-3xl mb-2">{shipEmoji}</div>
                <div className="text-white text-sm font-bold">{shipData.name}</div>
                <div className="text-gray-300 text-xs mb-2">{shipData.description}</div>
                
                {isCurrent && (
                  <div className="text-yellow-400 text-xs font-bold">✨ SELECTED</div>
                )}
                
                {!isUnlocked && shipData.cost > 0 && (
                  <div className={`text-xs font-bold ${canAfford ? 'text-yellow-400' : 'text-red-400'}`}>
                    💰 {shipData.cost} coins
                  </div>
                )}
                
                {isUnlocked && !isCurrent && (
                  <div className="text-green-400 text-xs">✅ OWNED</div>
                )}
                
                {shipData.cost === 0 && (
                  <div className="text-green-400 text-xs">🆓 FREE</div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="bg-black bg-opacity-30 p-2 rounded mb-3">
          <div className="text-yellow-400 text-sm">💰 Your Coins: {coins}</div>
          <div className="text-cyan-400 text-xs">Ships: {unlockedShips.length}/{Object.keys(availableShips).length}</div>
        </div>
        
        <button
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
          onClick={onClose}
        >
          Close Hangar
        </button>
      </div>
    </div>
  );
};

export default ShipSelector;