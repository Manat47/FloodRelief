const express = require("express");
const mongoose = require("mongoose");
const Team = require("../models/Team");
const Request = require("../models/Request");

const router = express.Router();

// ฟังก์ชันตรวจสอบว่า ID เป็น ObjectId หรือไม่
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// 📌 API สร้างทีมใหม่
router.post("/create", async (req, res) => {
  try {
    const { organization_id, volunteers, max_capacity } = req.body;

    const newTeam = new Team({
      organization_id,
      volunteers,
      max_capacity
    });

    await newTeam.save();
    res.status(201).json({ message: "Team created successfully", team: newTeam });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 API ดึงข้อมูลทีมขององค์กร
router.get("/:organization_id", async (req, res) => {
  try {
    const teams = await Team.find({ organization_id: req.params.organization_id });
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 Assign Team to Request
router.post("/assign", async (req, res) => {
    try {
        const { organization_id, request_id, team_id } = req.body;

         // ตรวจสอบ request_id ก่อน ว่าเป็น ObjectId หรือไม่
         if (!isValidObjectId(request_id)) {
            return res.status(400).json({ message: "Invalid request_id format" });
        }

        // ดึง Request ถ้าไม่เจอให้แจ้งว่า "Request not found"
        const request = await Request.findById(request_id);
        if (!request) {
            return res.status(404).json({ message: "Request not found" });
        }

        // ตรวจสอบว่าคำขอนี้ถูก Assigned ไปแล้วหรือยัง
        if (request.assigned_team) {
            return res.status(400).json({ message: "This request has already been assigned to a team." });
        }

        //  หา Team ที่ต้องการ
        const team = await Team.findById(team_id);
        if (!team) {
            return res.status(400).json({ message: "Team not found" });
        }

        //  ตรวจสอบว่า Team นี้เป็นของ Organization ที่ส่งมา
        if (team.organization_id.toString() !== organization_id) {
            return res.status(400).json({ message: "This team does not belong to the specified organization." });
        }

        // อัปเดต team และ request
        team.current_request = request_id;
        request.status = "assigned";
        request.assigned_team = team_id;

        await team.save();
        await request.save();

        res.json({ message: "Team assigned successfully", status: "assigned" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;