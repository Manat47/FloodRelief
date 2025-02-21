const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Mission = require("../models/mission");
const Volunteer = require("../models/volunteer");

// API ยอมรับภารกิจ
router.post("/:id/accept", async (req, res) => {
    try {
        const { id } = req.params; // mission_id
        const { volunteer_id } = req.body; // รับ volunteer_id จาก request body

        // ตรวจสอบว่า Mission มีอยู่จริงหรือไม่
        const mission = await Mission.findById(id);
        if (!mission) {
            return res.status(404).json({ message: "Mission not found" });
        }

        // ตรวจสอบว่า Volunteer มีอยู่จริง และสถานะเป็น "available"
        const volunteer = await Volunteer.findById(volunteer_id);
        if (!volunteer || volunteer.status !== "available") {
            return res.status(400).json({ message: "Volunteer not available or not found" });
        }

        // อัปเดต Mission (เพิ่ม Volunteer เข้าไปในภารกิจ)
        mission.volunteers.push(volunteer._id);
        await mission.save();

        //  อัปเดต Volunteer (บันทึก Mission ที่เข้าร่วม)
        volunteer.current_mission = mission._id;
        volunteer.status = "busy";
        await volunteer.save();

        res.status(200).json({
            message: "Mission accepted successfully",
            mission,
            volunteer
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

router.put("/:id/arrived", async (req, res) => {
    try {
        const { id } = req.params; // Mission ID
        const { volunteer_id } = req.body;

        // Find the mission
        const mission = await Mission.findById(id);
        if (!mission) {
            return res.status(404).json({ message: "Mission not found" });
        }

        // Check if volunteer is in the mission
        if (!mission.volunteers.includes(volunteer_id)) {
            return res.status(400).json({ message: "Volunteer not assigned to this mission" });
        }

        // Update mission status
        mission.status = "arrived";
        await mission.save();

        // Notify victim & organization (Future implementation)

        res.status(200).json({
            message: "Volunteer has arrived",
            mission: {
                _id: mission._id,
                status: mission.status
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

router.put("/:id/complete", async (req, res) => {
    try {
        const { id } = req.params;
        const { volunteer_id } = req.body;

        // Find mission
        const mission = await Mission.findById(id);
        if (!mission) {
            return res.status(404).json({ message: "Mission not found" });
        }

        // Check if volunteer is part of this mission
        if (!mission.volunteers.includes(volunteer_id)) {
            return res.status(403).json({ message: "Volunteer not assigned to this mission" });
        }

        // Update mission status
        mission.status = "completed";
        mission.end_time = new Date();

        await mission.save();

        // Update volunteer stats
        const volunteer = await Volunteer.findById(volunteer_id);
        if (volunteer) {
            volunteer.missions_completed += 1;
            volunteer.current_mission = null;
            await volunteer.save();
        }

        res.status(200).json({ message: "Mission completed successfully", mission, volunteer });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
