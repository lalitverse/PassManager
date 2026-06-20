const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User with this email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({ success: true, message: 'Registration successful. You can now log in.' });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ success: false, message: 'Server error during registration' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    if (typeof password !== 'string' || typeof email !== 'string') {
      return res.status(400).json({ success: false, message: 'Invalid credentials format' });
    }

    // Ensure JWT_SECRET exists in the environment
    if (!process.env.JWT_SECRET) {
      console.error('CRITICAL: JWT_SECRET is not defined in environment variables');
      return res.status(500).json({ success: false, message: 'Server configuration error' });
    }

    // Find User safely
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Compare Password (both arguments are guaranteed to be valid strings now)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Update last login
    user.lastLogin = Date.now();
    await user.save();

    // Generate JWT strictly using the environment secret
    const token = jwt.sign(
      { id: user._id, email: user.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      token,
      user: {
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      }
    });

  } catch (error) {
    console.error('Login Error:', error);
    
    // Check for MongoDB connection stability errors
    if (error.name === 'MongoNetworkError' || error.name === 'MongooseServerSelectionError' || error.name === 'MongooseError' || error.message.includes('buffering timed out')) {
      return res.status(503).json({ success: false, message: 'Database connection error. Please ensure MongoDB is running.' });
    }
    
    return res.status(500).json({ success: false, message: `Server error during login: ${error.message}` });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    // Direct password reset approach: We always return success to prevent enumeration
    res.status(200).json({ success: true, message: 'Ready for password reset.' });

  } catch (error) {
    console.error('Forgot Password Error:', error);
    res.status(500).json({ success: false, message: 'Server error processing password reset request' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    
    if (!email || !newPassword) {
      return res.status(400).json({ success: false, message: 'Email and new password are required' });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
    }

    const user = await User.findOne({ email });

    // If user exists, update password silently.
    if (user) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      await user.save();
    }

    // Always return generic success to prevent email enumeration
    res.status(200).json({ success: true, message: 'Password successfully reset. You can now log in.' });

  } catch (error) {
    console.error('Reset Password Error:', error);
    res.status(500).json({ success: false, message: 'Server error processing password reset' });
  }
};
