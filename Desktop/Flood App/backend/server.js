require("dotenv").config(); // โหลดค่าจาก .env
console.log("✅ Loaded API Key:", process.env.LONGDO_MAP_API_KEY);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import Routes
const trackingRoutes = require("./routes/tracking");
const victimRoutes = require("./routes/victims");
const requestsRoutes = require("./routes/requests");
const teamRoutes = require("./routes/teams");
const organizationRoutes = require("./routes/organizations");
const volunteerRoutes = require("./routes/volunteer");
const missionRoutes = require("./routes/missions");
const adminRoutes = require("./routes/admin");
console.log("✅ Loading Maps Routes...");
const mapsRoutes = require("./routes/maps");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/victims", victimRoutes);
app.use("/api/requests", requestsRoutes);
app.use("/api/tracking", trackingRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/organizations", organizationRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/missions", missionRoutes);
app.use("/admin", adminRoutes);
app.use("/api/maps", mapsRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const LONGDO_MAP_API_KEY=process.env.LONGDO_MAP_API_KEY;  

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected!");

    // Show all available routes
    console.log("\n Available Routes:");
    app._router.stack
  .filter((layer) => layer.route)
  .forEach((layer) => {
    const methods = Object.keys(layer.route.methods)
      .map((m) => m.toUpperCase())
      .join(", ");
    console.log(`👉 [${methods}] ${layer.route.path}`);
  });

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// Start Server
startServer();