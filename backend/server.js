const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
if (process.env.FRONTEND_URL) allowedOrigins.push(process.env.FRONTEND_URL);

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/auth', authRoutes);

// Serve Frontend
app.use(express.static(path.resolve(__dirname, '../dist')));
const fs = require('fs');
app.use((req, res) => {
  res.send(fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf8'));
});

// Database Connection
const connectDB = async () => {
  try {
    const defaultUri = process.env.MONGO_URI;
    if (!defaultUri) {
      console.error('CRITICAL: MONGO_URI environment variable is not defined.');
      process.exit(1);
    }
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
