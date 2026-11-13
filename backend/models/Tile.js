
const mongoose = require("mongoose");

const tileSchema = new mongoose.Schema(
  {
    row: {
      type: Number,
      required: true,
      min: 0
    },
    col: {
      type: Number,
      required: true,
      min: 0
    },
    type: {
      type: String,
      enum: ["path", "start", "end", "empty"],
      default: "path"
    },
    rotation: {
      type: Number,
      default: 0,
      min: 0,
      max: 270,
      validate: {
        validator: (value) => value % 90 === 0,
        message: "Rotation must be a multiple of 90"
      }
    },
    level: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Level",
      required: true
    }
  },
  {
    timestamps: true
  }
);

tileSchema.index({ level: 1, row: 1, col: 1 }, { unique: true });

const Tile = mongoose.model("Tile", tileSchema);

module.exports = Tile;
