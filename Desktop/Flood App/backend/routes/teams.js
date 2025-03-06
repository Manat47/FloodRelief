const express = require("express");
const mongoose = require("mongoose");
const Team = require("../models/Team");
const Request = require("../models/Request");
const sendNotification = require("../utils/sendNotification");

const router = express.Router();

// ตรวจสอบ ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// API ดึงทีมขององค์กร
router.get("/:organization_id", async (req, res) => {
    try {
        const { organization_id } = req.params;

        // ตรวจสอบว่า organization_id ถูกต้องหรือไม่
        if (!isValidObjectId(organization_id)) {
            return res.status(400).json({ error: "Invalid organization ID" });
        }

        // ค้นหาทีมทั้งหมด พร้อม populate ข้อมูล 
        const teams = await Team.find({ organization_id }).populate("organization_id", "name email phone").exec();
        
        res.json(teams);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//  API สร้างทีม
router.post("/create", async (req, res) => {
    try {
        const { organization_id, team_name, max_capacity } = req.body;

        if (!isValidObjectId(organization_id)) {
            return res.status(400).json({ error: "Invalid organization ID" });
        }

        const newTeam = new Team({
            organization_id,
            team_name,
            max_capacity: max_capacity || 5,
            status: "available"
        });

        await newTeam.save();
        res.status(201).json({ message: "Team created successfully", team: newTeam });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//  API เพิ่มสมาชิกเข้า Team
router.post("/:id/add-member", async (req, res) => {
    try {
        const { volunteer_id } = req.body;
        const team_id = req.params.id;


        if (!isValidObjectId(team_id)) {
            return res.status(400).json({ error: "Invalid team ID" });
        }

        if (!isValidObjectId(volunteer_id)) {
            return res.status(400).json({ error: "Invalid volunteer ID" });
        }

        const team = await Team.findById(team_id);
        if (!team) {
            return res.status(404).json({ error: "Team not found" });
        }

        if (team.volunteers.includes(volunteer_id)) {
            return res.status(400).json({ error: "Volunteer already in team" });
        }

        if (team.current_members >= team.max_capacity) {
            return res.status(400).json({ error: "Team is full" });
        }
        // ถ้ายังไม่มีหัวหน้า และนี่คือคนแรก → ให้เป็นหัวหน้า
        if (!team.leader_id) {
            team.leader_id = volunteer_id;
        }
        if (team.current_request) {
            return res.status(400).json({ error: "Cannot add members while the team is on a mission." });
        }

        team.volunteers.push(volunteer_id);
        team.current_members = team.volunteers.length;
        team.updated_at = new Date();

        await team.save();
        await sendNotification(volunteer_id, `คุณถูกเพิ่มเข้าทีม: ${team.team_name}`);

        res.json({ message: "Volunteer added successfully", team });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//  API Assign Team to Request
router.post("/assign", async (req, res) => {
    try {
        const { organization_id, request_id, team_id } = req.body;

        //  ตรวจสอบว่าค่าที่ส่งมาเป็น ObjectId ที่ถูกต้องหรือไม่
        if (!mongoose.Types.ObjectId.isValid(request_id) || 
            !mongoose.Types.ObjectId.isValid(team_id) || 
            !mongoose.Types.ObjectId.isValid(organization_id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        //  ตรวจสอบว่าคำขอมีอยู่จริง
        const request = await Request.findById(request_id);
        if (!request) {
            return res.status(404).json({ message: "Request not found" });
        }

        //  ตรวจสอบว่าคำขอถูก assign ไปแล้วหรือยัง
        if (request.assigned_team) {
            return res.status(400).json({ message: "This request has already been assigned to a team" });
        }

        //  ตรวจสอบว่าทีมมีอยู่จริง
        const team = await Team.findById(team_id);
        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }

        //  ตรวจสอบว่า Team นี้เป็นของ Organization นี้จริงหรือไม่
        if (team.organization_id.toString() !== organization_id) {
            console.log("Team Organization ID:", team.organization_id.toString());
            console.log("Provided Organization ID:", organization_id);
            return res.status(400).json({ message: "This team does not belong to the specified organization." });
        }
        

        //  ตรวจสอบว่าทีมยังไม่ได้รับภารกิจอยู่ (current_request ต้องเป็น null)
        if (team.current_request) {
            return res.status(400).json({ message: "This team is already assigned to another request" });
        }

        // Assign ทีมให้กับคำขอ และเปลี่ยนสถานะ
        team.current_request = request_id;
        request.status = "assigned";
        request.assigned_team = team_id;

        //  บันทึกข้อมูลลงฐานข้อมูล
        await team.save();
        await request.save();

        // แจ้งเตือนสมาชิกทุกคนในทีมเกี่ยวกับภารกิจใหม่
        for (const volunteer of team.volunteers) {
            await sendNotification(volunteer, "ทีมของคุณได้รับมอบหมายภารกิจใหม่!");
        }

        // ส่ง Response กลับไป
        res.json({ message: "Team assigned successfully", status: "assigned" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/:id/check-ready", async (req, res) => {
    try {
        const team_id = req.params.id;
        const team = await Team.findById(team_id);

        if (!team) {
            return res.status(404).json({ error: "Team not found" });
        }

        // ตรวจสอบว่าทีมมีสมาชิกครบแล้วหรือยัง
        if (team.current_members === team.max_capacity) {
            // ส่งแจ้งเตือนหาองค์กร
            await sendNotification(team.organization_id, "ทีมพร้อมแล้ว! สามารถเริ่มภารกิจได้");

            return res.json({ message: "Notification sent: Team is ready" });
        }

        if (!team.leader_id) {
            return res.status(400).json({ message: "Team is not ready. No leader assigned." });
        }        

        res.json({ message: "Team is not full yet" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/:id/update-status", async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // ตรวจสอบว่า ID ถูกต้องไหม
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid team ID" });
        }

        // ค้นหาทีมใน database
        const team = await Team.findById(id);
        if (!team) {
            return res.status(404).json({ error: "Team not found" });
        }

        // อัปเดตสถานะของทีม
        team.status = status;
        team.updated_at = new Date();
        await team.save();

        res.json({ message: "Team status updated successfully", team });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API ลบ Volunteer ออกจากทีม
router.delete("/:team_id/remove-member/:volunteer_id", async (req, res) => {
    try {
        const { team_id, volunteer_id } = req.params; // ดึงค่า volunteer_id จาก params

        // ตรวจสอบว่า team_id และ volunteer_id เป็น ObjectId ที่ถูกต้อง
        if (!isValidObjectId(team_id) || !isValidObjectId(volunteer_id)) {
            return res.status(400).json({ error: "Invalid team ID or volunteer ID" });
        }

        const team = await Team.findById(team_id);
        if (!team) {
            return res.status(404).json({ error: "Team not found" });
        }

        // ตรวจสอบว่า volunteer อยู่ในทีมจริงไหม
        if (!team.volunteers.includes(volunteer_id)) {
            return res.status(400).json({ error: "Volunteer is not a member of this team" });
        }

        // ลบ Volunteer ออกจากทีม
        team.volunteers = team.volunteers.filter(id => id.toString() !== volunteer_id);
        team.current_members = team.volunteers.length;
        team.updated_at = new Date();

         // ถ้าหัวหน้าถูกลบ ให้เลือกคนใหม่
        if (team.leader_id.toString() === volunteer_id) {
            team.leader_id = team.volunteers.length > 0 ? team.volunteers[0] : null;
        }


        await team.save();

        // ส่งแจ้งเตือนไปยังอาสาสมัครที่ถูกลบ
        await sendNotification(volunteer_id, `คุณถูกลบออกจากทีม: ${team.team_name}`);

        res.json({ message: "Volunteer removed successfully", team });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API ลบทีม (DELETE /api/teams/:id/delete)
router.delete("/:id/delete", async (req, res) => {
    try {
        const { organization_id } = req.body; // รับค่า organization_id จาก request
        const team_id = req.params.id;

        // ตรวจสอบว่า team_id และ organization_id เป็น ObjectId ที่ถูกต้อง
        if (!mongoose.Types.ObjectId.isValid(team_id) || !mongoose.Types.ObjectId.isValid(organization_id)) {
            return res.status(400).json({ error: "Invalid team ID or organization ID" });
        }

        // ค้นหาทีมในระบบ
        const team = await Team.findById(team_id);
        if (!team) {
            return res.status(404).json({ error: "Team not found" });
        }

        // ตรวจสอบว่าองค์กรที่ร้องขอลบ เป็นเจ้าของทีมจริงหรือไม่
        if (team.organization_id.toString() !== organization_id) {
            return res.status(403).json({ error: "Unauthorized to delete this team" });
        }

        // ตรวจสอบว่ามีภารกิจที่กำลังดำเนินการอยู่หรือไม่
        if (team.current_request !== null) {
            return res.status(400).json({ error: "Cannot delete team. There is an ongoing mission." });
        }

        // ลบทีมออกจากฐานข้อมูล
        await Team.findByIdAndDelete(team_id);

        res.json({ message: "Team deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
