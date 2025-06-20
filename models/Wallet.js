const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema(
  {
    userId: String,
    name: String,
    address: String,
    balance: {
      type: Number,
      default: 0,
    },
    eth: {
      type: Number,
      default: 0,
    },
    btc: {
      type: Number,
      default: 0,
    },
    usdc: {
      type: Number,
      default: 0,
    },
    matic: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Wallet", walletSchema);
