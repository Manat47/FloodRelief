const mongoose = require("mongoose");

const VolunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  organization_id: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
  role: { type: String, enum: ["leader", "member"], default: "member" },
  missions_completed: { type: Number, default: 0 },
  current_mission: { type: mongoose.Schema.Types.ObjectId, ref: "Mission", default: null },
  status: { type: String, enum: ["available", "busy", "withdrawn"], default: "available" },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Volunteer", VolunteerSchema);
