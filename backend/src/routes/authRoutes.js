import express from 'express';
import { signup, login } from '../controllers/authController.js';
import { createValidator, schemas } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/signup', createValidator(schemas.auth.signup), signup);
router.post('/login', createValidator(schemas.auth.login), login);

export default router;
