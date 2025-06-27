import React from 'react';

const GameOverScreen = ({ score, currentStage, onTryAgain, onMainMenu }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="text-center bg-black bg-opacity-50 p-6 rounded-lg border border-red-500 max-w-md">
        <div className="text-6xl mb-4">💔</div>
        <h1 className="text-3xl font-bold text-red-400 mb-4">Patient Lost</h1>
        <p className="text-gray-300 mb-6">
          The pathogens overwhelmed your systems. Every loss teaches us to be better healers.
        </p>
        
        <div className="bg-red-900 bg-opacity-30 p-4 rounded-lg mb-6">
          <div className="text-white text-lg">Final Score: {score}</div>
          <div className="text-red-300 text-sm">Stage Reached: {currentStage}</div>
        </div>
        
        <div className="flex gap-3 justify-center">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
            onClick={onTryAgain}
          >
            Try Again
          </button>
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
            onClick={onMainMenu}
          >
            Main Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverScreen;