import React from 'react';

const CompleteScreen = ({ score, coins, onPlayAgain }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-800 to-purple-900 flex items-center justify-center p-4">
      <div className="text-center bg-black bg-opacity-50 p-6 rounded-lg border border-green-500 max-w-md">
        <div className="text-6xl mb-4">🏆</div>
        <h1 className="text-3xl font-bold text-green-400 mb-4">MEDICAL HERO!</h1>
        
        <div className="bg-gradient-to-r from-green-800 to-blue-800 p-4 rounded-lg mb-4">
          <h3 className="text-xl font-bold text-yellow-400 mb-3">🎊 AMAZING! 🎊</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-black bg-opacity-40 p-2 rounded">
              <div className="text-cyan-400">Final Score</div>
              <div className="text-white text-lg font-bold">{score}</div>
            </div>
            <div className="bg-black bg-opacity-40 p-2 rounded">
              <div className="text-green-400">Coins Earned</div>
              <div className="text-white text-lg font-bold">{coins}</div>
            </div>
          </div>
        </div>
        
        <div className="space-y-2 mb-6">
          <p className="text-cyan-400">You saved every patient! 🎉</p>
          <p className="text-green-300 text-sm">Master nano-physician achieved! 🧠⚡</p>
        </div>
        
        <div className="flex gap-3 justify-center">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-5 rounded-lg transition-all duration-300 transform hover:scale-105"
            onClick={onPlayAgain}
          >
            🌟 Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompleteScreen;