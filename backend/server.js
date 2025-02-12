import dotenv from "dotenv";

// Load environment variables before any other imports
dotenv.config();

import { config } from './src/config/config.js';
import express from "express";
import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import authRoutes from "./src/routes/authRoutes.js";
import fileRoutes from "./src/routes/fileRoutes.js";
import { s3 } from "./src/config/awsConfig.js"; // Import optimized AWS config

const app = express();
const port = config.port;

// Log configuration status
console.log('Configuration loaded:', {
    userPoolId: config.cognito.userPoolId ? '✓' : '✗',
    clientId: config.cognito.clientId ? '✓' : '✗',
    region: config.aws.region ? '✓' : '✗',
    bucket: config.aws.bucketName ? '✓' : '✗'
});

// ✅ Middleware to parse JSON requests
app.use(express.json());  // 💡 This enables `req.body`
app.use(express.urlencoded({ extended: true })); // (Optional) for URL-encoded data


// Set up file storage for multer (store file in memory before upload)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Welcome Route
app.get("/", (req, res) => {
  res.send("Welcome to AWS S3 File Upload!");
});

// Upload File to S3
app.post("/upload", upload.single("file"), async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "Please upload a file" });
  }

  // You can optionally add a unique key for the file to avoid overwriting
  const fileKey = `${Date.now()}-${file.originalname}`;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileKey,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "private", // You can change to "public-read" if needed
  };

  try {
    const uploadCommand = new PutObjectCommand(params);
    await s3.send(uploadCommand);

    res.status(200).json({
      message: "File uploaded successfully",
      fileName: fileKey, // Send the fileKey as a response
    });
  } catch (error) {
    console.error("Upload failed:", error);
    res.status(500).json({ message: "File upload failed", error });
  }
});

// Routes for authentication and file management
app.use("/auth", authRoutes);
app.use("/files", fileRoutes);

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`COGNITO_CLIENT_ID = ${process.env.COGNITO_CLIENT_ID}`);
});
