const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  victim_id: { type: mongoose.Schema.Types.ObjectId, ref: "Victim" },
  requested_items: {
    water: Number,
    food: Number,
    medicine: [String],
    evacuation: Boolean
  },
  num_people: Number,
  additional_notes: String,
  status: { type: String, enum: ["pending", "in_progress", "completed"], default: "pending" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Request", RequestSchema);
