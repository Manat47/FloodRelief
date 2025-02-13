require("dotenv").config(); // โหลดค่าจาก .env
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const trackingRoutes = require("./routes/tracking");
const victimRoutes = require("./routes/victims");
const requestsRoutes = require("./routes/requests");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/victims", victimRoutes);
app.use("/api/requests", requestsRoutes);
app.use("/api/tracking", trackingRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;  

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.json({ message: "Flood Relief API is running..." });
});

console.log("✅ Available Routes:");
app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
    console.log(`👉 [${Object.keys(r.route.methods).join(', ').toUpperCase()}] ${r.route.path}`);
  }
});


app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));