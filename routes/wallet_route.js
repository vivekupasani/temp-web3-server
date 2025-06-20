const express = require("express");
const router = express.Router();
const walletController = require("../controllers/wallet_controller");

// router.post('/create', walletController.createWallet);
router.get("/", walletController.getAllWallets);
router.get("/:address", walletController.getWalletById);
// router.put('/:walletId', walletController.updateWallet);
// router.delete('/:walletId', walletController.deleteWallet);

module.exports = router;
