require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// เชื่อมต่อ MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// นำเข้าไฟล์ routes
const requestRoutes = require("./routes/requests");
const organizationRoutes = require("./routes/organizations");
const teamRoutes = require("./routes/teams");
const trackingRoutes = require("./routes/tracking");
const victimRoutes = require("./routes/victims"); // เพิ่ม victims
//console.log("✅ requestRoutes:", requestRoutes);
//console.log("✅ organizationRoutes:", organizationRoutes);
//console.log("✅ teamRoutes:", teamRoutes);
//console.log("✅ trackingRoutes:", trackingRoutes);
//console.log("✅ victimRoutes:", victimRoutes);

app.use("/requests", requestRoutes);
app.use("/organizations", organizationRoutes);
app.use("/teams", teamRoutes);
app.use("/tracking", trackingRoutes);
app.use("/victims", victimRoutes);

app.get("/", (req, res) => {
  res.send("✅ Server is running...");
});

app.listen(5001, () => console.log("✅ Server running on port 5000"));
