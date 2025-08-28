const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const mongoose = require('mongoose');

// Import routes - FIXED PATHS (files are in same directory)
const contactRoutes = require('./contactRoutes');    // Changed from '../routes/contactRoutes'
const projectRoutes = require('./projectRoutes');    // Changed from '../routes/projectRoutes'

// Create express app
const app = express();

// Load environment variables
require('dotenv').config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/project', projectRoutes);

// Basic route
app.get('/api', (req, res) => {
  res.json({ message: 'Portfolio API is running on Netlify!' });
});

// API health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is healthy', timestamp: new Date() });
});

// For local development

const PORT = process.env.PORT || 5112;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export the serverless app
module.exports.handler = serverless(app);

