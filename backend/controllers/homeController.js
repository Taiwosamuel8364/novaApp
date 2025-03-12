const homeController = {
  getHomeData: async (req, res) => {
    try {
      const homeData = {
        heroTitle: 'Discover Your Dream Career Path with CareerNova',
        heroDescription: 'Navigate your professional journey with our AI-powered career guidance platform'
      };
      res.json(homeData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getLandingData: async (req, res) => {
    try {
      const landingData = {
        title: 'DISCOVER YOUR FUTURE AND EXPOSE YOUR HIDDEN TALENTS',
        subtitle: 'With a Personalized AI POWERED Career Guidance And Mentorship Tool',
        features: [
          'AI-Powered Career Guidance',
          'Professional Mentorship',
          'Personalized Learning Path',
          'Skill Assessment & Development',
          'Industry Expert Network'
        ]
      };
      res.json(landingData);
    } catch (error) {
      console.error('Landing data error:', error);
      res.status(500).json({ 
        error: 'Failed to fetch landing data',
        message: error.message 
      });
    }
  }
};

module.exports = homeController;
