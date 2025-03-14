import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaEdit, FaSave } from 'react-icons/fa';
import ErrorMessage from './ErrorMessage';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fieldOfInterest: '',
    bio: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/users/me', {
          withCredentials: true
        });
        const userData = response.data.data;
        setUser(userData);
        setFormData({
          username: userData.username || '',
          email: userData.email || '',
          fieldOfInterest: userData.fieldOfInterest || '',
          bio: userData.bio || ''
        });
      } catch (err) {
        setError(err.response?.data || { message: 'Failed to load profile' });
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/users/${user._id}`, formData, {
        withCredentials: true
      });
      setUser(response.data.data);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError(err.response?.data || { message: 'Failed to update profile' });
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <FaUser />
        </div>
        <h1>{user.username}'s Profile</h1>
        <button 
          className="edit-button"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? <FaSave /> : <FaEdit />}
        </button>
      </div>

      {error && <ErrorMessage error={error} />}

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Field of Interest</label>
          <select
            name="fieldOfInterest"
            value={formData.fieldOfInterest}
            onChange={handleChange}
            disabled={!isEditing}
          >
            <option value="">Select a field</option>
            <option value="technology">Technology</option>
            <option value="healthcare">Healthcare</option>
            <option value="business">Business</option>
            <option value="education">Education</option>
            <option value="engineering">Engineering</option>
          </select>
        </div>

        <div className="form-group">
          <label>Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            disabled={!isEditing}
            rows="4"
          />
        </div>

        {isEditing && (
          <button type="submit" className="save-button">
            Save Changes
          </button>
        )}
      </form>
    </div>
  );
};

export default Profile;
