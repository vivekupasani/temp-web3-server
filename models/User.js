const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    password: String,
    name: String,
    phone: String,
    wallet: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("web3User", userSchema);

module.exports = User;
