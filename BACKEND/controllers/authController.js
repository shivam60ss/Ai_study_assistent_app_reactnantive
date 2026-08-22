import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// ── Generate Token ─────────────────────────────────────
const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in .env');
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// ── Email Validator ────────────────────────────────────
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// ── SIGNUP ─────────────────────────────────────────────
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name, email and password are required.'
      });
    }

    // 2. Validate name
    if (name.trim().length < 3) {
      return res.status(400).json({
        message: 'Name must be at least 3 characters.'
      });
    }

    // 3. Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({
        message: 'Invalid email format.'
      });
    }

    // 4. Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters.'
      });
    }

    // 5. Check if email already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        message: 'Email is already registered.'
      });
    }

    // 6. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 7. Save user to MongoDB ✅
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    // 8. Generate token
    const token = generateToken(user._id);

    // 9. Send response
    return res.status(201).json({
      message: 'Signup successful ✅',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });

  } catch (error) {
    console.error('Signup Error:', error);

    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'Email is already registered.'
      });
    }

    return res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// ── LOGIN ──────────────────────────────────────────────
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check required fields
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required.'
      });
    }

    // 2. Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({
        message: 'Invalid email format.'
      });
    }

    // 3. Find user in MongoDB
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password.'
      });
    }

    // 4. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid email or password.'
      });
    }

    // 5. Generate token
    const token = generateToken(user._id);

    // 6. Send response
    return res.status(200).json({
      message: 'Login successful ✅',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });

  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// ── GET PROFILE ────────────────────────────────────────
export const getProfile = async (req, res) => {
  try {
    // req.user is set by protect middleware
    if (!req.user) {
      return res.status(401).json({
        message: 'Unauthorized'
      });
    }

    return res.status(200).json({
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        createdAt: req.user.createdAt,
      },
    });

  } catch (error) {
    console.error('Profile Error:', error);
    return res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};