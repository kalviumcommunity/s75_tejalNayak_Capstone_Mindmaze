const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Mind Maze backend is running 🚀");
});

// GET API for 2.6
app.get("/api/levels", (req, res) => {
  res.json([
    { id: 1, name: "Easy", grid: "6x6" },
    { id: 2, name: "Medium", grid: "8x8" },
    { id: 3, name: "Hard", grid: "10x10" }
  ]);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
