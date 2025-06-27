import React from 'react';

const BrainFact = ({ fact }) => {
  return (
    <div className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-green-900 border-2 border-green-400 rounded-lg p-3 z-50 max-w-sm">
      <div className="text-green-300 font-bold text-xs mb-1">{fact.category}</div>
      <div className="text-white text-xs">{fact.fact}</div>
    </div>
  );
};

export default BrainFact;