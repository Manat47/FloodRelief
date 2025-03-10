require('dotenv').config();
const express = require('express');
const Request = require('../models/request');
const mongoose = require('mongoose');
const multer = require('multer');
const  GridFsStorage  = require("multer-gridfs-storage");
const { GridFSBucket, ObjectId } = require("mongodb");


const router = express.Router();

let gfs;
mongoose.connection.once('open', () => {
  gfs = new GridFSBucket(mongoose.connection.db, { bucketName: "uploads" });
 /* gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'uploads', // ต้องเป็น bucket เดียวกับที่ใช้ใน GridFsStorage
  });*/
});
const storage = new GridFsStorage({
  url: process.env.MONGO_URI,  // ใช้ URL ที่กำหนดใน .env หรือ default
  file: (req, file) => ({
    filename: `${Date.now()}-${file.originalname}`,
    bucketName: "uploads",
  }),
  
});
const upload = multer({ storage });

const longdoMapApi = process.env.Longdo_Map_API;

router.post('/', upload.single('file'), async (req, res) => {
  try {
    const newRequest = new Request({
      wantHelp: JSON.parse(req.body.wantHelp),
      medicineOptions: JSON.parse(req.body.medicineOptions),
      medicineDetails: JSON.parse(req.body.medicineDetails),
      peopleCount: parseInt(req.body.peopleCount),
      details: req.body.details,
      selectedMedia: req.file ? new ObjectId(req.file.id) : null,
    });
    await newRequest.save();
    res.status(201).json({ message: "Request saved successfully", request: newRequest });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
        // ตรวจสอบว่าไฟล์มีหรือไม่
    //let selectedMedia = null;
   // if (req.file) {
      /*const fileUrl = `${req.protocol}://${req.get('host')}/file/${req.file.filename}`;URL ที่ใช้เข้าถึงไฟล์ ที่ผู้ใช้ได้อัปโหลดได้โดยอัตโนมัติ ซึ่งทำให้ไฟล์เหล่านั้นสามารถเข้าถึงได้ผ่าน URL จากบราวเซอร์หรือแอปพลิเคชันอื่นๆ ที่ต้องการเข้าถึงไฟล์.สามารถใช้ fileUrl นี้เพื่อส่ง URL ของไฟล์ที่อัปโหลดไปให้กับผู้ใช้หรือจัดเก็บข้อมูลของไฟล์ในฐานข้อมูล*/
      //selectedMedia = req.file.id;  // สร้าง URL ของไฟล์ใน GridFS

    /*const newRequest = new Request({
      wantHelp: req.body.wantHelp,
      medicineOptions: req.body.medicineOptions,
      medicineDetails: req.body.medicineDetails,
      peopleCount: req.body.peopleCount,
      details: req.body.details,
      selectedMedia, // เก็บ ObjectId ของไฟล์ใน GridFS
    });*/

   /* await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});*/

router.get('/', async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
/*router.get('/file/:filename', async (req, res) => {
  try {
    const file = await gfs.find({ filename: req.params.filename }).toArray();
    if (!file || file.length === 0) {
      return res.status(404).json({ message: 'ไม่พบไฟล์' });
    }

    const readStream = gfs.openDownloadStreamByName(req.params.filename);
    readStream.pipe(res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});*/
router.get("/file/:id", async (req, res) => {
  try {
    const fileId = new ObjectId(req.params.id);
    const downloadStream = gfs.openDownloadStream(fileId);

    downloadStream.on("error", (err) => res.status(404).json({ message: "File not found" }));
    downloadStream.pipe(res);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


module.exports = router;