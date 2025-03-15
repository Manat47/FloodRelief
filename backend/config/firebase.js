import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// Parse Firebase Service Account JSON from .env
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || "{}");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
