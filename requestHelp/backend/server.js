require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const gridfsStream = require("gridfs-stream");
const app = express();
app.use(express.json());
app.use(cors());

// เชื่อมต่อ MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    // ตั้งค่า GridFS
    const gfs = gridfsStream(mongoose.connection.db, mongoose.mongo);
    gfs.collection('uploads');
    app.locals.gfs = gfs; 
  })
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const longdoMapApi = process.env.Longdo_Map_API;
const requestRoutes = require("./routes/requestRoutes");
app.use("/api/requests", requestRoutes);

app.get("/", (_req, res) => {
  res.send("✅ Server is running...");
});
app.listen(5000, () => console.log("✅ Server running on port 5000"));
