import { useState, useEffect } from 'react';
import axios from 'axios';

const useLandingData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/home/landing');
        setData(response.data);
        console.log('Landing data fetched:', response.data); // Debug log
      } catch (err) {
        console.error('Error fetching landing data:', err.response?.data || err.message);
        setError(err.response?.data?.message || err.message);
        // Fallback data in case of error
        setData({
          title: 'DISCOVER YOUR FUTURE AND EXPOSE YOUR HIDDEN TALENTS',
          subtitle: 'With a Personalized AI POWERED Career Guidance And Mentorship Tool',
          features: ['AI-Powered Career Guidance', 'Professional Mentorship', 'Skill Assessment']
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useLandingData;
