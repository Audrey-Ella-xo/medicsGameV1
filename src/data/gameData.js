export const availableShips = {
  '🚀': { name: 'Nano Rocket', cost: 0, trail: '#60a5fa', description: 'Classic medical ship' },
  '🛸': { name: 'UFO Healer', cost: 50, trail: '#10b981', description: 'Advanced alien tech' },
  '🚁': { name: 'Med Helicopter', cost: 75, trail: '#f59e0b', description: 'Emergency response' },
  '🏥': { name: 'Hospital Ship', cost: 100, trail: '#ef4444', description: 'Mobile medical center' },
  '⚡': { name: 'Lightning Bolt', cost: 125, trail: '#fbbf24', description: 'Speed of light healing' },
  '💎': { name: 'Crystal Ship', cost: 200, trail: '#a855f7', description: 'Rare crystalline vessel' },
  '🌟': { name: 'Star Healer', cost: 300, trail: '#06d6a0', description: 'Legendary cosmic ship' },
  '❤️': { name: 'Heart Ship', cost: 150, trail: '#f472b6', description: 'Pure healing energy' }
};

export const medicalTools = {
  basic: { name: "Basic Nano-Probe", icon: "🔧", description: "Standard repair tool", efficiency: 1.0, color: "#60a5fa" },
  precision: { name: "Precision Laser", icon: "⚡", description: "High-precision repairs", efficiency: 1.3, color: "#fbbf24" },
  stemcell: { name: "Stem Cell Injector", icon: "🧬", description: "Regenerative healing", efficiency: 1.1, color: "#10b981" },
  ultrasonic: { name: "Ultrasonic Probe", icon: "🌊", description: "Gentle vibration therapy", efficiency: 1.2, color: "#8b5cf6" }
};

export const virusTypes = {
  inflammation: { name: "Inflammation Virus", icon: "🦠", weakness: "precision", speed: 0.8, health: 1 },
  toxin: { name: "Neurotoxin", icon: "☣️", weakness: "basic", speed: 0.6, health: 1 },
  necrosis: { name: "Necrosis Agent", icon: "💀", weakness: "stemcell", speed: 0.7, health: 2 },
  oxidative: { name: "Oxidative Stress", icon: "🔥", weakness: "ultrasonic", speed: 0.9, health: 1 }
};

export const stages = {
  1: {
    title: "🧠 MOTOR CORTEX TRAINING",
    timeLimit: 300,
    emergencyLevel: "LEARNING",
    maxViruses: 2,
    neurons: [
      { id: 1, x: 35, y: 40, type: 'Motor Cortex', info: 'Controls voluntary movement', health: 100, repairType: 'precision' },
      { id: 2, x: 65, y: 35, type: 'Premotor Area', info: 'Plans complex movements', health: 100, repairType: 'basic' }
    ],
    objective: "Repair motor neurons while avoiding pathogens"
  },
  2: {
    title: "🧠 MEMORY SYSTEM CARE", 
    timeLimit: 240,
    emergencyLevel: "ROUTINE",
    maxViruses: 3,
    neurons: [
      { id: 3, x: 30, y: 30, type: 'Hippocampus', info: 'Memory formation center', health: 80, repairType: 'stemcell' },
      { id: 4, x: 70, y: 40, type: 'Prefrontal Cortex', info: 'Executive functions', health: 75, repairType: 'precision' },
      { id: 5, x: 50, y: 65, type: 'Neural Networks', info: 'Information highways', health: 90, repairType: 'ultrasonic' }
    ],
    objective: "Restore memory pathways"
  },
  3: {
    title: "🧠 NEUROTRANSMITTER BALANCE",
    timeLimit: 180,
    emergencyLevel: "CRITICAL",
    maxViruses: 4,
    neurons: [
      { id: 6, x: 25, y: 25, type: 'Dopamine Hub', info: 'Reward and motivation', health: 70, repairType: 'stemcell' },
      { id: 7, x: 75, y: 30, type: 'Serotonin Center', info: 'Mood regulation', health: 65, repairType: 'precision' },
      { id: 8, x: 50, y: 50, type: 'GABA System', info: 'Calming signals', health: 80, repairType: 'ultrasonic' },
      { id: 9, x: 40, y: 70, type: 'Acetylcholine', info: 'Learning chemical', health: 75, repairType: 'basic' }
    ],
    objective: "Balance neurotransmitter systems"
  }
};

export const patientMessages = [
  "Thank you for saving my memory! I can remember my family again! 💕",
  "My tremors are completely gone - you're a miracle worker! 🙏",
  "I feel like myself again thanks to your gentle care! ✨",
  "Your precision surgery gave me my life back! 🌟",
  "I can think clearly for the first time in months! 🧠"
];

export const brainFacts = [
  "Your brain uses 20% of your body's energy - about 400 calories daily!",
  "Neurons can fire up to 200 times per second - faster than a hummingbird's wings!",
  "You have 86 billion neurons - more than stars in the Milky Way!",
  "Neuroplasticity allows your brain to rewire itself throughout life!"
];

export const gameConstants = {
  SHIP_SPEED: 2.5,
  REPAIR_DISTANCE: 25,
  VIRUS_DETECTION_RANGE: 35,
  INVULNERABILITY_TIME: 2000,
  COMBO_TIMEOUT: 5000,
  ANIMATION_FRAME_RATE: 16,
  GAME_LOOP_RATE: 50
};