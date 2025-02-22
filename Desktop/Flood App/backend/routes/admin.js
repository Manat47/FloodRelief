const express = require("express");
const router = express.Router();
const Organization = require("../models/Organization");

// ดึงองค์กรที่รออนุมัติ
router.get("/organizations/pending", async (req, res) => {
    try {
        const pendingOrgs = await Organization.find({ status: "pending" });
        res.status(200).json(pendingOrgs);
    } catch (error) {
        res.status(500).json({ message: "เกิดข้อผิดพลาด", error });
    }
});

router.post("/organizations/approve/:id", async (req, res) => {
    try {
        const organization = await Organization.findById(req.params.id);
        if (!organization) {
            return res.status(404).json({ message: "ไม่พบองค์กรนี้" });
        }

        // อัปเดตสถานะเป็น approved
        organization.status = "approved";
        organization.updatedAt = new Date();

        await organization.save();

        // TODO: ส่งอีเมลแจ้งเตือนองค์กรว่าถูกอนุมัติแล้ว

        res.status(200).json({ message: "อนุมัติองค์กรเรียบร้อย", organization });
    } catch (error) {
        res.status(500).json({ message: "เกิดข้อผิดพลาด", error });
    }
});

router.post("/organizations/reject/:id", async (req, res) => {
    try {
        const organization = await Organization.findById(req.params.id);
        if (!organization) {
            return res.status(404).json({ message: "ไม่พบองค์กรนี้" });
        }

        // รับเหตุผลที่ปฏิเสธจาก Body
        const { reason } = req.body;
        if (!reason) {
            return res.status(400).json({ message: "กรุณาระบุเหตุผลที่ปฏิเสธ" });
        }

        // อัปเดตสถานะเป็น rejected พร้อมเหตุผล
        organization.status = "rejected";
        organization.reason = reason;
        organization.updatedAt = new Date();

        await organization.save();

        // TODO: ส่งอีเมลแจ้งองค์กรว่าถูกปฏิเสธ พร้อมเหตุผล

        res.status(200).json({ message: "ปฏิเสธองค์กรเรียบร้อย", organization });
    } catch (error) {
        res.status(500).json({ message: "เกิดข้อผิดพลาด", error });
    }
});

module.exports = router;
