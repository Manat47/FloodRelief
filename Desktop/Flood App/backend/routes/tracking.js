const express = require("express");
const mongoose = require("mongoose");
const Tracking = require("../models/Tracking");
const router = express.Router();

// 📌 3️⃣ POST /tracking → สร้างข้อมูลติดตามครั้งแรก
router.post("/", async (req, res) => {
    try {
      console.log("📌 Creating new tracking record:", req.body);  // Debug log
  
      const { request_id, victim_id, status_updates } = req.body;
  
      // ตรวจสอบว่ามี tracking สำหรับ request นี้แล้วหรือไม่
      const existingTracking = await Tracking.findOne({ request_id });
      if (existingTracking) {
        return res.status(400).json({ message: "Tracking already exists for this request." });
      }
  
      const tracking = new Tracking({ request_id, victim_id, status_updates });
      await tracking.save();
  
      res.status(201).json(tracking);
    } catch (error) {
      console.error("❌ Error creating tracking:", error.message);
      res.status(500).json({ error: error.message });
    }
  });

// 📌 1️⃣ API ให้ Victim ดูสถานะของคำขอ
router.get("/:request_id", async (req, res) => {
  try {
    console.log("🔎 Request ID:", req.params.request_id);  // เช็กว่ามันได้ค่าอะไรมา
    const tracking = await Tracking.findOne({ request_id: req.params.request_id });
    if (!tracking) return res.status(404).json({ message: "ไม่พบข้อมูลติดตามสถานะ" });
    res.json(tracking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 2️⃣ POST /tracking/update → อัปเดตสถานะของคำขอ
router.post("/update", async (req, res) => {
    try {
      console.log("📌 Received data:", req.body);  // เพิ่ม log ดูค่าที่ได้รับ

      const { request_id, status, message } = req.body;
  
      // ค้นหา Tracking ของ Request นี้
      let tracking = await Tracking.findOne({ request_id });
  
      if (!tracking) {
        return res.status(404).json({ message: "ไม่พบข้อมูลการติดตาม" });
      }
  
      // เพิ่มข้อมูลอัปเดตสถานะใหม่
      tracking.status_updates.push({ status, message });
  
      await tracking.save();
      res.json(tracking);
    } catch (error) {
      console.error("❌ Error:", error.message); // เพิ่ม log error
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
