require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Level = require("./models/Level");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Mind Maze backend is running 🚀");
});

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

app.put("/api/levels/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, grid } = req.body;

    if (!name || !grid) {
      return res.status(400).json({
        message: "Level name and grid are required"
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