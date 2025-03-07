const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  user_id: { type: String, required: true },  // ID ของ User
  role: { type: String, enum: ["victim", "volunteer", "organization"], required: true },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Location", LocationSchema);
