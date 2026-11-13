
const mongoose = require("mongoose");

const levelSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    grid: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// One Level can have multiple Tiles
levelSchema.virtual("tiles", {
  ref: "Tile",
  localField: "_id",
  foreignField: "level"
});

const Level = mongoose.model("Level", levelSchema);

module.exports = Level;
