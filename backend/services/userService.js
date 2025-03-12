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
    return await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');
  }

  static async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  }
}

module.exports = UserService;
