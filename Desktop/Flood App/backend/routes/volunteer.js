const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Volunteer = require("../models/volunteer");
const Mission = require("../models/mission");

//  API ดึงข้อมูลโปรไฟล์ของ Volunteer
router.get("/:id", async (req, res) => {
    try {
      const volunteer = await Volunteer.findById(req.params.id);
      if (!volunteer) {
        return res.status(404).json({ message: "Volunteer not found" });
      }
      res.status(200).json(volunteer);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

  //  API ดึงภารกิจปัจจุบันของ Volunteer
router.get("/:id/missions", async (req, res) => {
    try {
      const { id } = req.params;
  
      // ค้นหา Volunteer
      const volunteer = await Volunteer.findById(id);
      if (!volunteer) {
        return res.status(404).json({ message: "Volunteer not found" });
      }
  
      // เช็คว่ามีภารกิจปัจจุบันหรือไม่
      if (!volunteer.current_mission) {
        return res.status(200).json({ message: "No active mission", mission: null });
      }
  
      // ดึงข้อมูลภารกิจจาก current_mission
      const mission = await Mission.findById(volunteer.current_mission);
      if (!mission) {
        return res.status(404).json({ message: "Mission not found" });
      }
  
      res.status(200).json({ mission });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

//  API สมัคร Volunteer
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

//  API อัปเดตข้อมูล Volunteer
router.put("/:id/update", async (req, res) => {
    try {
      const { id } = req.params;
      const { name, phone, email } = req.body;
  
      // ตรวจสอบว่า Volunteer มีอยู่หรือไม่
      const volunteer = await Volunteer.findById(id);
      if (!volunteer) {
        return res.status(404).json({ message: "Volunteer not found" });
      }
  
      // ตรวจสอบเบอร์โทรว่าไม่ซ้ำ
      const existingPhone = await Volunteer.findOne({ phone });
      if (existingPhone && existingPhone._id.toString() !== id) {
        return res.status(400).json({ message: "Phone number already in use" });
      }
  
      // อัปเดตข้อมูล
      volunteer.name = name || volunteer.name;
      volunteer.phone = phone || volunteer.phone;
      volunteer.email = email || volunteer.email;
  
      await volunteer.save();
  
      res.status(200).json({ message: "Profile updated successfully", volunteer });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
  

module.exports = router;
