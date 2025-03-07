const mongoose = require("mongoose");

const victimSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String },
  address: { type: String }
});

// ✅ บังคับให้ Mongoose ใช้ Collection ชื่อ "victims" ตรงกับ Compass
module.exports = mongoose.model("Victim", victimSchema, "victims");
