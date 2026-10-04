const levels = require("../data/levels");

const getLevels = (req, res) => {
  res.status(200).json(levels);
};

module.exports = {
  getLevels,
};