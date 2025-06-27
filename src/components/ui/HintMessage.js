import React from 'react';

const HintMessage = ({ message }) => {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 p-2 rounded-lg border border-cyan-400 z-50 max-w-sm text-center">
      <div className="text-cyan-400 text-xs">{message}</div>
    </div>
  );
};

export default HintMessage;