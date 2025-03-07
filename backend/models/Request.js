const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  location: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: "pending" },
  victim_id: { type: mongoose.Schema.Types.ObjectId, ref: "Victim" } // ✅ ต้องมี ref: "Victim"
});

module.exports = mongoose.model("Request", requestSchema);
