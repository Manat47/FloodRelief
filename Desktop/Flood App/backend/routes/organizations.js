const express = require("express");
const mongoose = require("mongoose");
const Request = require("../models/Request");
const router = express.Router();
const Organization = require("../models/Organization");

//  GET /organizations/:organization_id/requests → ดึงคำขอช่วยเหลือขององค์กร
router.get("/:organization_id/requests", async (req, res) => {
  try {
      if (!mongoose.Types.ObjectId.isValid(req.params.organization_id)) {
          return res.status(400).json({ message: "Invalid organization_id format" });
      }

      const requests = await Request.find({ organization_id: req.params.organization_id });
      res.json(requests);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
    try {
        const organizations = await Organization.find();
        res.json(organizations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;

        // ตรวจสอบว่ามีอีเมลนี้อยู่แล้วหรือไม่
        const existingOrg = await Organization.findOne({ email });
        if (existingOrg) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        // สร้างองค์กรใหม่
        const newOrganization = new Organization({
            name,
            email,
            phone,
            address,
            status: "pending" // องค์กรใหม่อาจต้องได้รับอนุมัติก่อน
        });

        await newOrganization.save();
        res.status(201).json(newOrganization);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
