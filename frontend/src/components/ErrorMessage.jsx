import React from 'react';

const ErrorMessage = ({ error }) => {
  if (!error) return null;

  return (
    <div className="error-message">
      {error.message || 'An error occurred'}
      {error.details && (
        <ul>
          {error.details.map((detail, index) => (
            <li key={index}>{detail.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ErrorMessage;
