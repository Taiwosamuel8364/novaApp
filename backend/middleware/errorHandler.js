const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      details: Object.values(err.errors).map(error => ({
        field: error.path,
        message: error.message
      }))
    });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(409).json({
      success: false,
      error: 'Duplicate Field',
      message: field === 'email' ? 'Email already registered' : `${field} already exists`,
      field: field
    });
  }

  if (err.name === 'AuthenticationError') {
    return res.status(401).json({
      success: false,
      error: 'Authentication Error',
      message: err.message || 'Invalid email or password',
      field: 'email'
    });
  }

  if (err.status === 404) {
    return res.status(404).json({
      success: false,
      error: 'Not Found',
      message: err.message || 'Resource not found'
    });
  }

  res.status(500).json({
    success: false,
    error: 'Server Error',
    message: err.message || 'Something went wrong',
    field: err.field || null
  });
};

module.exports = errorHandler;
