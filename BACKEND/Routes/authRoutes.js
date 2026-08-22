import express from 'express';
import { signup, login, getProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/signup', signup);       // POST   
router.post('/login', login);         // POST /api/auth/login

// Protected routes
router.get('/profile', protect, getProfile); // GET /api/auth/profile

export default router;



