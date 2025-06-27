import React from 'react';

const PatientMessage = ({ message }) => {
  return (
    <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-600 to-blue-600 p-3 rounded-lg border-2 border-green-400 z-50 max-w-sm">
      <div className="text-center">
        <div className="text-xl mb-1">💕</div>
        <div className="text-white text-xs italic">{message}</div>
      </div>
    </div>
  );
};

export default PatientMessage;