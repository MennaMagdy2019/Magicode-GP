const mongoose = require("mongoose");

const certificateSchema = mongoose.Schema({
  theme_Imgs: { type: Array },

});

module.exports = mongoose.model("certificates", certificateSchema);
