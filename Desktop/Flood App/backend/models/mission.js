const mongoose = require("mongoose");

const MissionSchema = new mongoose.Schema({
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  request_id: { type: mongoose.Schema.Types.ObjectId, ref: "Request", required: true },
  organization_id: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", required: true },
  volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Volunteer" }],
  team_leader: { type: mongoose.Schema.Types.ObjectId, ref: "Volunteer" },
  status: { type: String, enum: ["pending", "in_progress", "completed"], default: "pending" },
  start_time: { type: Date, default: null },
  end_time: { type: Date, default: null }
});

module.exports = mongoose.model("Mission", MissionSchema);
