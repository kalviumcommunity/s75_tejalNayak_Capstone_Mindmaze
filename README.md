🧠 Mind Maze

Mind Maze is a neon-themed puzzle game built with React where players rotate tiles to form a continuous path from the start to the exit before time runs out. Designed to be both relaxing and mentally challenging, the game helps improve focus, concentration, and problem-solving skills.

🎯 Problem Statement

Staying focused for long periods can be difficult, especially during studying or work. Distractions often break concentration and reduce productivity. I personally faced this issue and wanted a fun yet challenging way to train my focus.

💡 Solution

Mind Maze turns focus training into an engaging puzzle experience. Players must carefully plan and rotate glowing tiles under time pressure to solve increasingly complex mazes. The combination of neon visuals, smooth animations, and calming background music creates an immersive experience that rewards patience and concentration.

🕹️ How the Game Works

The maze starts at the top-left tile and ends at the bottom-right tile.

Each tile contains a pipe/connector.

Click (or tap) a tile to rotate it 90° clockwise.

Connect all tiles correctly to form a valid path before the timer reaches zero.

Solve the maze to win — run out of time and the game ends.

✨ Key Features

🔄 Tile Rotation Mechanics – Rotate tiles to align paths

🧩 Multiple Difficulty Levels

Easy (6×6)

Medium (8×8)

Hard (10×10)

Very Hard (12×12)

Lunatic (15×15)

⏱️ Timer-Based Challenge

🌈 Neon-Themed UI with glowing effects

🎵 Background Music & Sound Effects using Howler.js

🏆 Win & Lose Screens

📱 Fully Mobile Responsive

💾 Progress Saving using Local Storage

🛠️ Tech Stack

Frontend: React (JavaScript)

Animations: Framer Motion

Audio: Howler.js

Styling: CSS (Neon theme & animations)

State Management: React Hooks

Deployment: Vercel / Netlify

📁 Project Structure
mind-maze/
│
├── public/
│   └── assets/
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── MindMaze.jsx
│   │   ├── Tile.jsx
│   │   ├── Welcome.jsx
│   │   ├── Win.jsx
│   │   └── Lose.jsx
│   │
│   ├── styles/
│   │   ├── Tile.css
│   │   ├── MindMaze.css
│   │   └── global.css
│   │
│   ├── utils/
│   │   ├── mazeUtils.js
│   │   └── sounds.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
└── package.json

🚀 Getting Started
1️⃣ Clone the Repository
git clone https://github.com/your-username/mind-maze.git

2️⃣ Install Dependencies
npm install

3️⃣ Run the Project
npm start


Open http://localhost:3000 in your browser.

🧪 Gameplay Goals

Improve focus and concentration

Enhance logical thinking

Train patience under time pressure

Enjoy a visually calming yet challenging experience

📅 Development Timeline

This project was developed using a structured 30-day plan, starting from basic layout and tile mechanics to advanced animations, sound integration, difficulty scaling, and final deployment.

## Live Application

Deployed frontend: [Mind Maze](https://funny-narwhal-988b5f.netlify.app/)

Project Description

Mind Maze is a focus-based puzzle game where players rotate connector tiles to create a continuous path from the starting point to the exit before the timer runs out.

Technology Stack

React

Vite

JavaScript

CSS

Node.js

Express

MongoDB

🙌 Future Improvements

More maze patterns

Leaderboard system

Daily challenges

Accessibility improvements

Dark/Light neon themes

👤 Author

Tejal Nayak
Frontend Developer | React Enthusiast