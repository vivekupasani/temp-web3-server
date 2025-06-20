const Transaction = require("../models/Transactions");
const Wallet = require("../models/Wallet");
exports.sendTransaction = async (req, res) => {
  const { from, to, amount, type } = req.body;
  try {
    const fromWallet = await Wallet.findOne({ address: from });
    const toWallet = await Wallet.findOne({ address: to });

    if (!fromWallet || !toWallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }

    // Check if type is valid and balances exist
    if (!["eth", "btc", "usdc", "matic"].includes(type)) {
      return res.status(400).json({ error: "Invalid transaction type" });
    }

    if ((fromWallet[type] || 0) < amount) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    let balanceToDeduct = 0;
    if (type === "eth") {
      balanceToDeduct = amount * 3500;
    } else if (type === "btc") {
      balanceToDeduct = amount * 65000;
    } else if (type === "usdc") {
      balanceToDeduct = amount * 1;
    } else if (type === "matic") {
      balanceToDeduct = amount * 1.2;
    }
    fromWallet[type] -= amount;
    fromWallet.balance -= balanceToDeduct;
    toWallet[type] = (toWallet[type] || 0) + amount;
    toWallet.balance += balanceToDeduct;

    await fromWallet.save();
    await toWallet.save();

    const amt = `${amount} ${type.toUpperCase()}`;
    // Create a new transaction
    const tx = new Transaction({
      from,
      to,
      usd: balanceToDeduct,
      amount: amt,
      status: "completed",
      transactiontype: "send",
    });
    await tx.save();

    res.status(201).json(tx);
  } catch (error) {
    console.error("Transaction error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllTransactions = async (req, res) => {
  const txs = await Transaction.find();
  res.json(txs);
};

exports.getTransactionById = async (req, res) => {
  const tx = await Transaction.findById(req.params.transactionId);
  tx ? res.json(tx) : res.status(404).json({ error: "Not found" });
};

exports.getWalletTransactions = async (req, res) => {
  const txs = await Transaction.find({
    $or: [{ from: req.params.walletId }, { to: req.params.walletId }],
  });
  res.json(txs);
};
