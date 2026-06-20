require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/auth', authRoutes);

// Database Connection
const connectDB = async () => {
  try {
    const defaultUri = process.env.MONGO_URI || 'mongodb://localhost:27017/ciphervault';
    await mongoose.connect(defaultUri, { serverSelectionTimeoutMS: 5000 });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('CRITICAL: MongoDB connection failed.');
    console.error('Error Details:', err.message);
    process.exit(1);
  }
};
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on PORT: ${PORT}`);
});
