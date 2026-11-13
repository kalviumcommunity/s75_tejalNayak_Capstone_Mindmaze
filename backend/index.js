
require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Level = require("./models/Level");
const Tile = require("./models/Tile");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Mind Maze backend is running 🚀");
});

// GET all levels
app.get("/api/levels", async (req, res) => {
  try {
    const levels = await Level.find().sort({ id: 1 });

    res.json(levels);
  } catch (error) {
    console.error("Error reading levels:", error);

    res.status(500).json({
      message: "Failed to fetch levels"
    });
  }
});

// POST a new level
app.post("/api/levels", async (req, res) => {
  try {
    const { name, grid } = req.body;

    if (!name || !grid) {
      return res.status(400).json({
        message: "Level name and grid are required"
      });
    }

    const lastLevel = await Level.findOne().sort({ id: -1 });

    const newId = lastLevel ? lastLevel.id + 1 : 1;

    const newLevel = await Level.create({
      id: newId,
      name,
      grid
    });

    res.status(201).json({
      message: "Level created successfully",
      level: newLevel
    });
  } catch (error) {
    console.error("Error creating level:", error);

    res.status(500).json({
      message: "Failed to create level"
    });
  }
});

// PUT update an existing level
app.put("/api/levels/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, grid } = req.body;

    if (!Number.isInteger(id) || !name || !grid) {
      return res.status(400).json({
        message: "Valid level ID, name and grid are required"
      });
    }

    const updatedLevel = await Level.findOneAndUpdate(
      { id },
      {
        name,
        grid
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedLevel) {
      return res.status(404).json({
        message: "Level not found"
      });
    }

    res.json({
      message: "Level updated successfully",
      level: updatedLevel
    });
  } catch (error) {
    console.error("Error updating level:", error);

    res.status(500).json({
      message: "Failed to update level"
    });
  }
});

// POST create a tile and associate it with a level
app.post("/api/levels/:id/tiles", async (req, res) => {
  try {
    const levelId = Number(req.params.id);
    const { row, col, type, rotation } = req.body;

    if (
      !Number.isInteger(levelId) ||
      !Number.isInteger(row) ||
      !Number.isInteger(col) ||
      row < 0 ||
      col < 0
    ) {
      return res.status(400).json({
        message: "Valid level ID, row and col are required"
      });
    }

    const level = await Level.findOne({ id: levelId });

    if (!level) {
      return res.status(404).json({
        message: "Level not found"
      });
    }

    const newTile = await Tile.create({
      row,
      col,
      type,
      rotation,
      level: level._id
    });

    res.status(201).json({
      message: "Tile created and linked to level successfully",
      tile: newTile
    });
  } catch (error) {
    console.error("Error creating tile:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "A tile already exists at this position in this level"
      });
    }

    res.status(500).json({
      message: "Failed to create tile"
    });
  }
});

// GET all tiles belonging to a level
app.get("/api/levels/:id/tiles", async (req, res) => {
  try {
    const levelId = Number(req.params.id);

    if (!Number.isInteger(levelId)) {
      return res.status(400).json({
        message: "Invalid level ID"
      });
    }

    const level = await Level.findOne({ id: levelId });

    if (!level) {
      return res.status(404).json({
        message: "Level not found"
      });
    }

    const tiles = await Tile.find({
      level: level._id
    }).populate("level", "id name grid");

    res.json({
      message: "Tiles retrieved successfully",
      level: {
        id: level.id,
        name: level.name,
        grid: level.grid
      },
      tiles
    });
  } catch (error) {
    console.error("Error retrieving tiles:", error);

    res.status(500).json({
      message: "Failed to retrieve tiles"
    });
  }
});

// MongoDB connection and server startup
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });
