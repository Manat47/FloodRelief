const express = require("express");
const Request = require("../models/Request");
const router = express.Router();

// 📌 POST /requests → ให้ผู้ใช้ส่งคำขอช่วยเหลือ
router.post("/", async (req, res) => {
  try {
    const request = new Request(req.body);
    await request.save();
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 GET /requests → ดูรายการคำขอทั้งหมด
router.get("/", async (req, res) => {
  try {
    const requests = await Request.find().populate("victim_id");
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 อัปเดตคำขอความช่วยเหลือ (PUT)
router.put("/:id", async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!request) return res.status(404).json({ message: "Request not found" });
    res.json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 ลบคำขอความช่วยเหลือ (DELETE)
router.delete("/:id", async (req, res) => {
  try {
    const request = await Request.findByIdAndDelete(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });
    res.json({ message: "Request deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
