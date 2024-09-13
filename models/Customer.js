const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 50,
    },
    email: {
      type: String,
      trim: true,
      unique: 1,
    },
    password: {
      type: String,
      minlength: 5,
    },
    role: {
      type: String,
      default: "2", // User: 2, Admin: 1, SuperAdmin: 0
    },
    accountstatus: {
      type: Boolean,
      default: true,
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
