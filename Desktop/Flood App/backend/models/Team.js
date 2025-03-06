const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  organization_id: { type: String, required: true },
  volunteers: [{ type: String }], // เก็บ ID ของอาสาสมัคร
  max_capacity: { type: Number, default: 5 }, // จำนวนสูงสุดของอาสาสมัครในทีม
  status: {
    type: String,
    enum: ["available", "pending", "booked", "assigned", "in_progress", "completed"],
    default: "available"
},
  current_request: { type: String, default: null } // คำขอที่ทีมนี้กำลังทำ
});

module.exports = mongoose.model("Team", TeamSchema);