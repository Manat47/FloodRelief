const express = require("express");
const axios = require("axios");
const router = express.Router();
const Location = require("../models/Location");

console.log("✅ API Key:", process.env.LONGDO_MAP_API_KEY);


// API บันทึกตำแหน่งของผู้ใช้
router.post("/store-location", async (req, res) => {
    try {
        const { user_id, role, coordinates } = req.body;
        if (!user_id || !role || !coordinates) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newLocation = new Location({ user_id, role, coordinates });
        await newLocation.save();
        res.json({ message: "Location stored successfully", location: newLocation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API คำนวณเส้นทาง
router.get("/directions", async (req, res) => {
    try {
        const { origin, destination } = req.query;
        if (!origin || !destination) {
            return res.status(400).json({ message: "Missing origin or destination" });
        }

        // แยกค่า lat,lng ออกจาก string
        const [flat, flon] = origin.split(",");
        const [tlat, tlon] = destination.split(",");

        console.log("🌍 Origin:", origin); // Debug ค่าที่รับเข้ามา
        console.log("🌍 Destination:", destination);
        console.log("🛠️ Parsed Coordinates:", { flat, flon, tlat, tlon });

        const url = `https://api.longdo.com/RouteService/json/route?apiKey=${process.env.LONGDO_MAP_API_KEY}&flon=${flon}&flat=${flat}&tlon=${tlon}&tlat=${tlat}`;
        
        console.log("🔗 Requesting:", url); // ดู URL ที่ส่งไป

        const response = await axios.get(url);
        console.log("📩 API Response:", response.data); // Debug ค่าที่ได้จาก Longdo API

        if (!response.data || response.data === null) {
            return res.status(500).json({ message: "No data received from Longdo API" });
        }

        res.json(response.data);
    } catch (error) {
        console.error("❌ Longdo API Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
