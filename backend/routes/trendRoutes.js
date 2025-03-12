const express = require('express');
const router = express.Router();
const trendController = require('../controllers/trendController');
const { protect } = require('../middleware/authMiddleware');

// Apply middleware to all routes
router.use(protect);

// Routes
router.get('/', trendController.getTrends);
router.get('/trending', trendController.getTrendingTopics);

module.exports = router;
