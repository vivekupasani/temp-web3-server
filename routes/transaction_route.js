const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactions_controller");

router.post("/send", transactionController.sendTransaction);
router.get("/", transactionController.getAllTransactions);
router.get("/:transactionId", transactionController.getTransactionById);
router.get("/wallet/:walletId", transactionController.getWalletTransactions);

module.exports = router;
