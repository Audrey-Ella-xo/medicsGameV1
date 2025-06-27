# 🧠 Micro Medics Game

A React-based educational brain surgery simulation game where players navigate nano-ships through neural networks to repair damaged neurons and eliminate pathogens!

## 🌟 Features

- **Interactive Gameplay**: Navigate using keyboard (WASD/Arrow keys) or mouse/touch controls
- **Educational Content**: Learn real brain science while playing
- **Progressive Difficulty**: 3 stages covering different brain regions
- **Ship Customization**: 8 unlockable nano-ships with unique designs
- **Medical Tools**: 4 different tools for optimal neuron repair
- **Real-time Vitals**: Monitor patient health and brain activity
- **Achievement System**: Unlock achievements and earn coins
- **Mobile Friendly**: Responsive design with touch controls and haptic feedback

## 🚀 Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Download the game files** and extract to a folder called `micro-medics-game`

2. **Navigate to the project directory**:
   ```bash
   cd micro-medics-game
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm start
   ```

5. **Open your browser** and go to `http://localhost:3000`

### Building for Production

To create a production build:

```bash
npm run build
```

The build files will be in the `build` folder.

## 🎮 How to Play

### Controls
- **Movement**: WASD keys or Arrow keys (or tap/click to move)
- **Repair**: SPACE key (or click on neurons)
- **Tool Selection**: Click on tool icons in the UI
- **Ship Customization**: Click the ship icon in the top bar

### Objective
1. Navigate your nano-ship through brain tissue
2. Repair damaged neurons using the appropriate medical tools
3. Avoid or eliminate pathogens with the correct tools
4. Complete all stages to become a master nano-physician!

### Medical Tools
- **🔧 Basic Nano-Probe**: Standard repair tool
- **⚡ Precision Laser**: High-precision repairs (best for motor neurons)
- **🧬 Stem Cell Injector**: Regenerative healing (best for memory centers)
- **🌊 Ultrasonic Probe**: Gentle vibration therapy (best for neurotransmitters)

## 📁 Project Structure

```
src/
├── components/
│   ├── game/           # Game-specific components
│   │   ├── GameArea.js
│   │   ├── Ship.js
│   │   ├── Neuron.js
│   │   ├── Virus.js
│   │   ├── Particle.js
│   │   └── VisualFeedback.js
│   ├── screens/        # Different game screens
│   │   ├── IntroScreen.js
│   │   ├── GameScreen.js
│   │   ├── GameOverScreen.js
│   │   └── CompleteScreen.js
│   ├── ui/            # UI components
│   │   ├── GameUI.js
│   │   ├── ShipSelector.js
│   │   ├── HintMessage.js
│   │   ├── PatientMessage.js
│   │   ├── BrainFact.js
│   │   └── StageCompleteModal.js
│   └── MicroMedicsGame.js  # Main game component
├── data/
│   └── gameData.js     # Game configuration and data
├── hooks/
│   ├── useMovement.js  # Movement logic
│   └── useGameLoop.js  # Game loop and effects
├── utils/
│   └── gameUtils.js    # Utility functions
├── App.js
├── index.js
└── index.css
```

## 🛠️ Technologies Used

- **React 18**: Frontend framework
- **Tailwind CSS**: Styling and animations
- **JavaScript ES6+**: Modern JavaScript features
- **Custom Hooks**: Reusable game logic
- **Canvas/SVG**: Graphics and effects

## 🧠 Educational Aspects

The game teaches players about:
- Brain anatomy (Motor Cortex, Hippocampus, Prefrontal Cortex, etc.)
- Neurotransmitter systems (Dopamine, Serotonin, GABA, Acetylcholine)
- Medical procedures and tools
- Pathogen types and treatments
- Neural network functions

## 🎯 Game Stages

1. **Motor Cortex Training** (Learning): Practice basic repairs
2. **Memory System Care** (Routine): Restore memory pathways  
3. **Neurotransmitter Balance** (Critical): Balance brain chemistry

## 🏆 Achievements

- First Repair: Complete your first neuron repair
- Perfect Combo: Achieve high combo multipliers
- Ship Collector: Unlock all nano-ships
- Master Physician: Complete all stages

## 📱 Mobile Support

The game includes:
- Touch controls for movement and interaction
- Responsive design for different screen sizes
- Haptic feedback on supported devices
- Optimized UI for mobile gameplay

## 🔧 Development

### Available Scripts

- `npm start`: Runs the development server
- `npm build`: Builds the app for production
- `npm test`: Launches the test runner
- `npm eject`: Ejects from Create React App (irreversible)

### Customization

You can customize the game by modifying:
- `src/data/gameData.js`: Ships, tools, stages, and game constants
- `src/components/`: Individual game components
- `src/utils/gameUtils.js`: Game mechanics and utilities

## 🐛 Troubleshooting

**Game not starting?**
- Ensure Node.js version 14+ is installed
- Try deleting `node_modules` and running `npm install` again

**Performance issues?**
- Close other browser tabs
- Try refreshing the page
- Check if your device supports WebGL

**Touch controls not working?**
- Ensure you're on a touch-enabled device
- Try refreshing the page
- Check browser compatibility

## 📄 License

This project is for educational purposes. Feel free to modify and distribute for learning and teaching about brain science and game development.

## 🎉 Credits

Created as an educational tool to make neuroscience fun and accessible through interactive gaming!

---

Enjoy saving virtual patients and learning about the amazing complexity of the human brain! 🧠⚡