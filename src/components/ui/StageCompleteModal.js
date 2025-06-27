import React from 'react';

const StageCompleteModal = ({ stage, currentStage, onNext }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[100]">
      <div className="bg-gradient-to-br from-green-800 to-blue-800 p-6 rounded-2xl border-2 border-green-400 text-center max-w-sm">
        <h2 className="text-2xl font-bold text-green-400 mb-3">🎉 PATIENT SAVED! 🎉</h2>
        
        <div className="bg-black bg-opacity-40 p-3 rounded-lg mb-3">
          <div className="text-lg font-bold text-yellow-400 mb-2">Medical Success!</div>
          <div className="text-white text-sm">All neurons successfully repaired!</div>
          <div className="text-green-300 text-sm">+50 coins, +500 points earned!</div>
        </div>
        
        <div className="text-xs text-green-300 mb-4">
          🏆 {stage.objective} - Outstanding work!
        </div>
        
        {currentStage < 3 ? (
          <button 
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
            onClick={onNext}
          >
            🚑 Next Patient
          </button>
        ) : (
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
            onClick={onNext}
          >
            🏆 COMPLETE GAME
          </button>
        )}
      </div>
    </div>
  );
};

export default StageCompleteModal;