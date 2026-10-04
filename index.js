const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Mind Maze backend is running 🚀");
});

let levels = [
  { id: 1, name: "Easy", grid: "6x6" },
  { id: 2, name: "Medium", grid: "8x8" },
  { id: 3, name: "Hard", grid: "10x10" }
];

app.get("/api/levels", (req, res) => {
  res.json(levels);
});

app.post("/api/levels", (req, res) => {
  const { name, grid } = req.body;

  if (!name || !grid) {
    return res.status(400).json({
      message: "Level name and grid are required"
    });
  }

  const newLevel = {
    id: levels.length + 1,
    name: name,
    grid: grid
  };

  levels.push(newLevel);

  res.status(201).json({
    message: "Level created successfully",
    level: newLevel
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});