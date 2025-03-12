const Trend = require('../models/trend');

const trendController = {
  getTrends: async (req, res, next) => {
    try {
      const trends = await Trend.find()
        .sort({ views: -1, createdAt: -1 })
        .limit(10);
      
      res.json({
        success: true,
        data: trends
      });
    } catch (error) {
      next(error);
    }
  },

  getTrendingTopics: async (req, res, next) => {
    try {
      const trendingTopics = await Trend.find()
        .sort({ createdAt: -1 })
        .limit(6);
      
      res.json({
        success: true,
        data: trendingTopics
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = trendController;
