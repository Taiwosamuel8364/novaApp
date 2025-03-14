const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [30, 'Username cannot exceed 30 characters'],
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9_]+$/.test(v);
      },
      message: 'Username can only contain letters, numbers and underscores'
    }
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'], 
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please enter a valid email'
    }
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    validate: {
      validator: function(v) {
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]/.test(v);
      },
      message: 'Password must contain at least one letter and one number'
    }
  },
  fieldOfInterest: {
    type: String,
    required: [true, 'Field of interest is required'],
    enum: {
      values: ['technology', 'healthcare', 'business', 'education', 'engineering'],
      message: '{VALUE} is not a valid field of interest'
    }
  },
  bio: {
    type: String,
    trim: true,
    maxlength: [500, 'Bio cannot exceed 500 characters']
  },
  profileInfo: {
    firstName: String,
    lastName: String,
    bio: String,
    skills: [String],
    education: [{
      school: String,
      degree: String,
      field: String,
      from: Date,
      to: Date
    }],
    experience: [{
      company: String,
      position: String,
      from: Date,
      to: Date,
      current: Boolean,
      description: String
    }]
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  lastUpdated: { 
    type: Date, 
    default: Date.now 
  },
  profileUpdatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Add pre-save middleware to update lastUpdated
userSchema.pre('save', function(next) {
  this.lastUpdated = Date.now();
  next();
});

// Add pre-save middleware for profile updates
userSchema.pre('save', function(next) {
  if (this.isModified('bio') || this.isModified('fieldOfInterest')) {
    this.profileUpdatedAt = Date.now();
  }
  next();
});

// Add instance method to check if password needs update
userSchema.methods.passwordNeedsUpdate = function() {
  const sixMonthsAgo = new Date(Date.now() - 180 * 24 * 60 * 60 * 1000);
  return this.lastUpdated < sixMonthsAgo;
};

module.exports = mongoose.model('User', userSchema);
