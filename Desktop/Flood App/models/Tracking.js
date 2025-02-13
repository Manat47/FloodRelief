const mongoose = require("mongoose");

const TrackingSchema = new mongoose.Schema({
  request_id: { type: String, required: true, unique: true },
  victim_id: { type: String, required: true },
  organization_id: { type: String, required: false },
  volunteer_team_id: { type: String, required: false },
  status_updates: [
    {
      status: { type: String, required: true },
      message: { type: String, default: "" },
      timestamp: { type: Date, default: Date.now },
    }
  ]
});

module.exports = mongoose.model("Tracking", TrackingSchema);
