import React from 'react';
import './SkeletonLoader.css';

const SkeletonLoader = () => {
  return (
    <div className="skeleton-container">
      <div className="skeleton-card"></div>
      <div className="skeleton-card"></div>
      <div className="skeleton-card"></div>
      <div className="skeleton-grid">
        <div className="skeleton-topic"></div>
        <div className="skeleton-topic"></div>
        <div className="skeleton-topic"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
