const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    from: String,
    to: String,
    amount: String,
    transactiontype: String,
    usd: { type: Number, default: 0 },
    status: { type: String, default: "pending" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);
