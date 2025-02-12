import express from 'express';
import { uploadFile, getDownloadUrl } from '../controllers/fileController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { createValidator, schemas } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/upload', verifyToken, createValidator(schemas.file.upload), uploadFile);
router.get('/download/:fileName', verifyToken, getDownloadUrl);

export default router;
