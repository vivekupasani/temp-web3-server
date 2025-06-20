const Wallet = require("../models/Wallet");

// exports.createWallet = async (req, res) => {
//   const wallet = new Wallet(req.body);
//   await wallet.save();
//   res.status(201).json(wallet);
// };

exports.getAllWallets = async (req, res) => {
  const wallets = await Wallet.find();
  res.json(wallets);
};

exports.getWalletById = async (req, res) => {
  const address = req.params.address;
  try {
    const wallet = await Wallet.findOne({ address: address });
    if (wallet) {
      res.json(wallet);
    } else {
      res.status(404).json({ error: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// exports.updateWallet = async (req, res) => {
//   const wallet = await Wallet.findByIdAndUpdate(req.params.walletId, req.body, {
//     new: true,
//   });
//   res.json(wallet);
// };

// exports.deleteWallet = async (req, res) => {
//   await Wallet.findByIdAndDelete(req.params.walletId);
//   res.json({ message: "Deleted" });
// };
