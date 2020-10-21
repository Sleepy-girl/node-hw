const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    subscription: {
      type: String,
      enum: ["free", "pro", "premium"],
      default: "free",
    },
    token: String,
  },
  { versionKey: false }
);

class User {
  constructor() {
    this.db = mongoose.model("Users", userSchema);
  }

  getUsers = async (query) => {
    return await this.db.find(query);
  };

  getUserById = async (userId) => {
    return await this.db.findById(userId);
  };

  createUser = async (userData) => {
    return await this.db.create(userData);
  };

  updateUser = async (userId, userData) => {
    return await this.db.findByIdAndUpdate(userId, userData, {
      new: true,
    });
  };

  deleteUser = async (userId) => {
    return await this.db.findByIdAndRemove(userId);
  };
}
module.exports = new User();
