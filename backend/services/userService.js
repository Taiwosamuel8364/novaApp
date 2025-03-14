const User = require('../models/user');

class UserService {
  static async createUser(userData) {
    try {
      const user = new User(userData);
      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async findUserById(id) {
    return await User.findById(id).select('-password');
  }

  static async findUserByEmail(email) {
    return await User.findOne({ email });
  }

  static async updateUser(id, updateData) {
    // Validate email if it's being updated
    if (updateData.email) {
      const existingUser = await User.findOne({ 
        email: updateData.email,
        _id: { $ne: id }
      });
      
      if (existingUser) {
        throw new Error('Email already in use');
      }
    }

    // Validate username if it's being updated
    if (updateData.username) {
      const existingUser = await User.findOne({ 
        username: updateData.username,
        _id: { $ne: id }
      });
      
      if (existingUser) {
        throw new Error('Username already taken');
      }
    }

    return await User.findByIdAndUpdate(
      id,
      { 
        $set: updateData,
        profileUpdatedAt: Date.now()
      },
      { 
        new: true, 
        runValidators: true,
        select: '-password'
      }
    );
  }

  static async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  }
}

module.exports = UserService;
