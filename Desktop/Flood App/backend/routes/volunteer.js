const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Volunteer = require("../models/volunteer");

// ✅ API สมัคร Volunteer
router.post("/signup", async (req, res) => {
  try {
    const { name, phone, email, organization_id } = req.body;

    // ตรวจสอบว่า organization_id เป็น ObjectId ที่ถูกต้องหรือไม่
    if (!mongoose.Types.ObjectId.isValid(organization_id)) {
      return res.status(400).json({ message: "Invalid organization_id format" });
    }

    // ตรวจสอบว่าเบอร์โทรซ้ำหรือไม่
    const existingVolunteer = await Volunteer.findOne({ phone });
    if (existingVolunteer) {
      return res.status(400).json({ message: "Volunteer already exists" });
    }

    // สร้าง Volunteer ใหม่โดยแปลง organization_id เป็น ObjectId
    const newVolunteer = new Volunteer({
      name,
      phone,
      email,
      organization_id: new mongoose.Types.ObjectId(organization_id) // ✅ แปลงเป็น ObjectId
    });

    await newVolunteer.save();

    res.status(201).json({ message: "Volunteer registered successfully", volunteer: newVolunteer });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
