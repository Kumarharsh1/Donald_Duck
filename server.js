const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Import routes
const contactRoutes = require('./contactRoutes');
const projectRoutes = require('./projectRoutes');

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};
connectDB();

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/project', projectRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Backend is live 🚀');
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is healthy', timestamp: new Date() });
});

// Start server
const PORT = process.env.PORT || 5112;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
