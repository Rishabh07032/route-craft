const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  destination: String,
  budget: Number,
  days: Number,
  travelType: String,

  itinerary: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Trip", tripSchema);