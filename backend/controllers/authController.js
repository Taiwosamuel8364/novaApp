const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserService = require('../services/userService');

const authController = {
  signup: async (req, res, next) => {
    try {
      const { username, email, password, fieldOfInterest } = req.body;

      // Validate required fields
      if (!username || !email || !password || !fieldOfInterest) {
        return res.status(400).json({
          success: false,
          error: 'Missing Fields',
          message: 'All fields are required'
        });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user through service
      const user = await UserService.createUser({
        username,
        email,
        password: hashedPassword,
        fieldOfInterest
      });

      // Generate token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Set cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });

      res.status(201).json({
        success: true,
        userId: user._id
      });
    } catch (error) {
      next(error); // Pass to error handler
    }
  },

  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({
          success: false,
          error: 'Missing Fields',
          message: 'Username and password are required'
        });
      }

      // Find user and check password
      const user = await User.findOne({ username });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({
          success: false,
          error: 'Invalid Credentials',
          message: 'Invalid username or password'
        });
      }

      // Check if password needs update
      if (user.passwordNeedsUpdate()) {
        // Don't block login, but notify user
        res.set('X-Password-Update', 'needed');
      }

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Set cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });

      res.json({
        success: true,
        userId: user._id,
        redirect: '/api/trends' // Add redirect URL
      });
    } catch (error) {
      next(error);
    }
  },

  logout: async (req, res) => {
    res.clearCookie('token');
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  }
};

module.exports = authController;
