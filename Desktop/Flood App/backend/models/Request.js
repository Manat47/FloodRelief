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
  status: { 
    type: String, 
    enum: ["pending", "booked", "assigned", "in_progress", "completed"],
    default: "pending" 
  },
  organization_id: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", default: null },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Request", RequestSchema);
