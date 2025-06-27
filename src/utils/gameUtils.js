// Haptic feedback utilities
export const triggerHaptic = (type = 'default') => {
  if (!navigator.vibrate) return;
  switch(type) {
    case 'repair': navigator.vibrate([30, 10, 30]); break;
    case 'damage': navigator.vibrate([100]); break;
    case 'combo': navigator.vibrate([50, 20, 50, 20, 50]); break;
    case 'achievement': navigator.vibrate([80, 30, 80]); break;
    default: navigator.vibrate(50);
  }
};

// Distance calculation
export const calculateDistance = (pos1, pos2) => {
  return Math.sqrt(
    Math.pow(pos1.x - pos2.x, 2) + 
    Math.pow(pos1.y - pos2.y, 2)
  );
};

// Boundary checking
export const clampPosition = (position, min = 8, max = 92) => {
  return {
    x: Math.max(min, Math.min(max, position.x)),
    y: Math.max(min, Math.min(max, position.y))
  };
};

// Random position generation with minimum distance from ship
export const generateRandomPosition = (shipPosition, minDistance = 30) => {
  let x, y;
  do {
    x = Math.random() * 80 + 10;
    y = Math.random() * 80 + 10;
  } while (calculateDistance({ x, y }, shipPosition) < minDistance);
  
  return { x, y };
};

// Angle calculation between two points
export const calculateAngle = (from, to) => {
  return Math.atan2(to.y - from.y, to.x - from.x) * 180 / Math.PI;
};

// Normalize diagonal movement
export const normalizeDiagonalMovement = (deltaX, deltaY) => {
  if (deltaX !== 0 && deltaY !== 0) {
    return {
      deltaX: deltaX * 0.707,
      deltaY: deltaY * 0.707
    };
  }
  return { deltaX, deltaY };
};

// Check if position is within bounds
export const isWithinBounds = (position, bounds = { x: 100, y: 100 }) => {
  return position.x >= 0 && position.x <= bounds.x && 
         position.y >= 0 && position.y <= bounds.y;
};

// Format time display
export const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// Random element from array
export const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

// Generate unique ID
export const generateId = (prefix = '') => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};