const express = require("express");
const mongoose = require("mongoose");  // ✅ เพิ่ม mongoose
const Victim = require("../models/victim");
const Request = require("../models/Request"); 
const router = express.Router();

// 📌 อัปเดตข้อมูลผู้ประสบภัย (PUT)
router.put("/:id", async (req, res) => {
  try {
    const victim = await Victim.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!victim) return res.status(404).json({ message: "Victim not found" });
    res.json(victim);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 ลบข้อมูลผู้ประสบภัย (DELETE)
router.delete("/:id", async (req, res) => {
  try {
    const victim = await Victim.findByIdAndDelete(req.params.id);
    if (!victim) return res.status(404).json({ message: "Victim not found" });
    res.json({ message: "Victim deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 ให้ Victim ดูคำขอของตัวเอง
router.get("/:id/requests", async (req, res) => {
  try {
    const victimId = req.params.id;

    // ตรวจสอบว่า victimId เป็น ObjectId หรือไม่
    if (!mongoose.Types.ObjectId.isValid(victimId)) {
      return res.status(400).json({ message: "Invalid victim ID" });
    }

    const requests = await Request.find({ victim_id: new mongoose.Types.ObjectId(victimId) });
    
    if (!requests.length) return res.status(404).json({ message: "ไม่พบคำขอของคุณ" });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 2️⃣ API ให้ Victim ดูข้อมูลทั้งหมด
router.get("/", async (req, res) => {
  try {
    const victims = await Victim.find(); // ดึงข้อมูลจาก MongoDB
    res.json(victims);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 3️⃣ API ให้ Victim ดูข้อมูลของตัวเอง
router.get("/:id", async (req, res) => {
  try {
    const victim = await Victim.findById(req.params.id);
    if (!victim) return res.status(404).json({ message: "ไม่พบผู้ประสบภัย" });
    res.json(victim);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
    try {
      const victim = new Victim(req.body);  // สร้าง instance ใหม่ของ Victim model จาก req.body
      await victim.save();  // บันทึกลง MongoDB
      res.status(201).json(victim);  // ส่ง response กลับพร้อมข้อมูลที่ถูกบันทึก
    } catch (error) {
      res.status(500).json({ error: error.message });  // ถ้ามี error ให้ส่ง error message กลับไป
    }
  });

  // 📌 1️⃣ API ให้ Victim ดูคำขอของตัวเอง
router.get("/:id/requests", async (req, res) => {
  try {
    const requests = await Request.find({ victim_id: req.params.id });
    if (!requests.length) return res.status(404).json({ message: "ไม่พบคำขอของคุณ" });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 2️⃣ API ให้ Victim ดูสถานะคำขอของตัวเอง
router.get("/:id/tracking", async (req, res) => {
  try {
    const tracking = await Tracking.find({ victim_id: req.params.id });
    if (!tracking.length) return res.status(404).json({ message: "ไม่พบข้อมูลติดตามสถานะ" });
    res.json(tracking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
