const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
    organization_id: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", required: true },
    team_name: { type: String, required: true },
    volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Volunteer" }], // อาสาสมัครที่อยู่ในทีม
    leader_id: { type: mongoose.Schema.Types.ObjectId, ref: "Volunteer", default: null }, // หัวหน้าทีม
    max_capacity: { type: Number, default: 5 }, // จำนวนสูงสุดของทีม
    current_members: { type: Number, default: 0 }, // จำนวนสมาชิกปัจจุบัน
    status: {
        type: String,
        enum: ["available", "assigned", "active", "completed", "in-progress"],
        default: "available"
    }, // สถานะทีม
    current_request: { type: mongoose.Schema.Types.ObjectId, ref: "Request", default: null }, // ภารกิจที่กำลังทำอยู่
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  });

module.exports = mongoose.model("Team", TeamSchema);