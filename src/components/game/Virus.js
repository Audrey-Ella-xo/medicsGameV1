import React from 'react';
import { medicalTools } from '../../data/gameData';

const Virus = ({ virus }) => {
  return (
    <div
      className={`absolute w-8 h-8 rounded-full border-2 flex items-center justify-center text-lg transition-all duration-300 ${
        virus.isHunting ? 'animate-pulse bg-red-600 border-red-400 scale-125' : 
        'animate-spin bg-orange-500 border-orange-300'
      }`}
      style={{
        left: `${virus.x}%`,
        top: `${virus.y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: 15,
      }}
      title={`${virus.data.name} - Weakness: ${medicalTools[virus.data.weakness].name}`}
    >
      {virus.data.icon}
      {virus.isHunting && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-ping"></div>
      )}
    </div>
  );
};

export default Virus;