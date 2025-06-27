import React from 'react';
import { medicalTools } from '../../data/gameData';

const Neuron = ({ neuron, isRepaired, isOptimal, onRepair }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onRepair(neuron);
  };

  return (
    <div
      className={`absolute px-3 py-2 rounded-full border-2 text-center cursor-pointer transition-all duration-500 transform hover:scale-110 ${
        isRepaired 
          ? 'bg-green-500 border-green-300 text-white shadow-lg animate-pulse' 
          : isOptimal
          ? 'bg-orange-500 border-orange-300 text-white shadow-lg ring-2 ring-orange-300'
          : 'bg-red-500 border-red-300 text-white hover:bg-red-400 shadow-lg'
      }`}
      style={{
        left: `${neuron.x}%`,
        top: `${neuron.y}%`,
        transform: 'translate(-50%, -50%)',
        minWidth: '80px',
        fontSize: '12px',
        zIndex: 20,
      }}
      onClick={handleClick}
      title={`${neuron.info} | Best tool: ${medicalTools[neuron.repairType].name}`}
    >
      <div className="text-lg mb-1">
        {isRepaired ? '✨' : isOptimal ? '⚡' : '🔴'}
      </div>
      <div className="text-xs font-bold">{neuron.type}</div>
    </div>
  );
};

export default Neuron;