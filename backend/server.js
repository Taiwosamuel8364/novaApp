const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// Import routes
const userRoutes = require('./routes/userRoutes');
const homeRoutes = require('./routes/homeRoutes');
const authRoutes = require('./routes/authRoutes');
const trendRoutes = require('./routes/trendRoutes');
const errorHandler = require('./middleware/errorHandler');

// Middleware
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend server is working' });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/', homeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/trends', trendRoutes);

// 404 handler - must be before error handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: 'The requested resource was not found'
  });
});

// Error handling middleware should be last
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT)
  .on('error', (err) => {
    if (err.code === 'EACCES') {
      console.log(`Port ${PORT} requires elevated privileges. Trying port 3000...`);
      app.listen(3000, () => console.log('Server is running on port 3000'));
    } else {
      console.error(err);
    }
  })
  .on('listening', () => {
    console.log(`Server is running on port ${PORT}`);
  });
