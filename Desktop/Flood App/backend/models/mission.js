const mongoose = require("mongoose");

const MissionSchema = new mongoose.Schema({
  location: {
    latitude: Number,
    longitude: Number,
  },
  request_id: { type: mongoose.Schema.Types.ObjectId, ref: "Request" },
  organization_id: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
  volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Volunteer" }],
  team_leader: { type: mongoose.Schema.Types.ObjectId, ref: "Volunteer" },
  status: {
    type: String,
    enum: ["pending", "in_progress", "arrived", "completed"], // ✅ Add "arrived"
    default: "pending",
  },
  start_time: Date,
  end_time: Date,
});

module.exports = mongoose.model("Mission", MissionSchema);
