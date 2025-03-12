import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import SkeletonLoader from './SkeletonLoader';
import { FaSearch, FaUser } from 'react-icons/fa';
import './Trends.css';

const Trends = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [trends, setTrends] = useState([]);
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/api/auth/login');
      return;
    }

    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };

        const [trendsResponse, topicsResponse, userResponse] = await Promise.all([
          axios.get('/api/trends'),
          axios.get('/api/trends/trending'),
          token ? axios.get('/api/users/me', { headers }) : Promise.resolve({ data: null })
        ]);

        setTrends(trendsResponse.data.data);
        setTrendingTopics(topicsResponse.data.data);
        if (userResponse.data) {
          setUser(userResponse.data.data);
        }
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/api/auth/login');
        }
        setError(err.response?.data?.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="trends-container">
      <Sidebar />
      <main className="trends-content">
        <header className="trends-header">
          <div className="search-bar">
            <FaSearch />
            <input type="text" placeholder="Search trends..." />
          </div>
          <div className="user-profile">
            <span>{user?.name}</span>
            <FaUser />
          </div>
        </header>
        
        <div className="trends-body">
          {loading ? (
            <SkeletonLoader />
          ) : (
            <>
              <section className="current-trends">
                <h2>Current Trends</h2>
                {trends.map(trend => (
                  <div key={trend._id} className="trend-card">
                    <h3>{trend.title}</h3>
                    <p>{trend.description}</p>
                    <span>{trend.views} views</span>
                  </div>
                ))}
              </section>
              
              <section className="trending-topics">
                <h2>Trending Topics</h2>
                <div className="topics-grid">
                  {trendingTopics.map(topic => (
                    <div key={topic._id} className="topic-card">
                      <h3>{topic.title}</h3>
                      <p>Trending in {topic.category}</p>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Trends;
