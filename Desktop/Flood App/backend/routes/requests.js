const express = require("express");
const mongoose = require("mongoose");
const Request = require("../models/Request");
const Organization = require("../models/Organization");
const router = express.Router();

// POST /requests → ให้ผู้ใช้ส่งคำขอช่วยเหลือ
router.post("/", async (req, res) => {
  try {
      const { victim_id, requested_items, num_people, additional_notes, location } = req.body;

      const newRequest = new Request({
          victim_id,
          requested_items,
          num_people,
          additional_notes,
          location,
          status: "pending",  // ค่าเริ่มต้น
          created_at: Date.now(),
          updated_at: Date.now()
      });

      await newRequest.save();

      res.status(201).json(newRequest);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// API จองคำขอช่วยเหลือ
router.post("/:id/book", async (req, res) => {
  try {
      const { organization_id } = req.body;
      const request = await Request.findById(req.params.id);

      if (!request) {
          return res.status(404).json({ message: "Request not found" });
      }

      if (request.status !== "pending") {
          return res.status(400).json({ message: "Request already booked or assigned" });
      }

      if (!mongoose.Types.ObjectId.isValid(organization_id)) {
          return res.status(400).json({ message: "Invalid organization_id format" });
      }

      request.status = "booked";
      request.organization_id = organization_id;
      await request.save();

      res.json({ message: "Request booked successfully", expires_in: "15 minutes" });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// API ยกเลิกการจอง
router.post("/:request_id/cancel-booking", async (req, res) => {
  try {
      const { request_id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(request_id)) {
          return res.status(400).json({ message: "Invalid request_id format" });
      }

      const request = await Request.findById(request_id);
      if (!request) {
          return res.status(404).json({ message: "Request not found" });
      }

      if (request.status !== "booked") {
          return res.status(400).json({ message: "Request is not booked, cannot cancel" });
      }

      request.status = "pending";
      request.organization_id = null;
      request.updated_at = Date.now();

      await request.save();

      res.json({ message: "Request booking cancelled successfully", request });

  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// GET /requests → ดูรายการคำขอทั้งหมด
router.get("/", async (req, res) => {
  try {
    const requests = await Request.find().populate("victim_id");
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// อัปเดตคำขอความช่วยเหลือ (PUT)
router.put("/:id", async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!request) return res.status(404).json({ message: "Request not found" });
    res.json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// อัปเดตสถานะของคำขอ
router.put("/:id/status", async (req, res) => {
  try {
      const { status } = req.body;

      const validStatuses = ["pending", "assigned", "in_progress", "completed"];
      if (!validStatuses.includes(status)) {
          return res.status(400).json({ message: "Invalid status value" });
      }

      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
          return res.status(400).json({ message: "Invalid request_id format" });
      }

      const request = await Request.findByIdAndUpdate(
          req.params.id,
          { status: status, updated_at: Date.now() },
          { new: true }
      );

      if (!request) {
          return res.status(404).json({ message: "Request not found" });
      }

      res.json({ message: "Request status updated successfully", request });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

router.put("/:id/assign", async (req, res) => {
  try {
      const { organization_id } = req.body;
      
      // ตรวจสอบว่า Organization มีอยู่จริงไหม
      const organization = await Organization.findById(organization_id);
      if (!organization) {
          return res.status(400).json({ message: "Organization not found" });
      }

      // อัปเดต request ให้มี organization_id และเปลี่ยนสถานะเป็น "assigned"
      const request = await Request.findByIdAndUpdate(
          req.params.id,
          { organization_id, status: "assigned", updated_at: Date.now() },
          { new: true }
      );

      if (!request) {
          return res.status(404).json({ message: "Request not found" });
      }

      res.json({ message: "Request assigned successfully", request });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// ลบคำขอความช่วยเหลือ (DELETE)
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
