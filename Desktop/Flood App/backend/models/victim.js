const mongoose = require("mongoose");

const VictimSchema = new mongoose.Schema({
  full_name: String,
  phone: String,
  email: String,
  location: {
    latitude: Number,
    longitude: Number,
    address: String,
  },
  registration_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Victim", VictimSchema);
