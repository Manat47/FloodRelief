const express = require("express");
const mongoose = require("mongoose");
const Request = require("../models/Request");
const router = express.Router();

// 📌 GET /organizations/:organization_id/requests → ดึงคำขอช่วยเหลือขององค์กร
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

module.exports = router;