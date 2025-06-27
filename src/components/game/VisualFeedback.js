import React from 'react';

const VisualFeedback = ({ feedback }) => {
  return (
    <div
      className="absolute font-bold pointer-events-none text-lg"
      style={{
        left: `${feedback.x}%`,
        top: `${feedback.y}%`,
        color: feedback.color,
        opacity: feedback.life / 60,
        transform: 'translate(-50%, -50%)',
        zIndex: 50,
      }}
    >
      {feedback.text}
    </div>
  );
};

export default VisualFeedback;