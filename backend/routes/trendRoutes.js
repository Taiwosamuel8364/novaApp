const express = require('express');
const router = express.Router();
const trendController = require('../controllers/trendController');

router.get('/', trendController.getTrends);
router.get('/trending', trendController.getTrendingTopics);

module.exports = router;
