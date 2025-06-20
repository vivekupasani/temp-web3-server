const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Routes
app.use("/api/auth", require("./routes/user_router"));
app.use("/api/wallets", require("./routes/wallet_route"));
app.use("/api/transactions", require("./routes/transaction_route"));
// app.use("/api/tokens", require("./routes/tokenRoutes"));
// app.use("/api/contacts", require("./routes/contactRoutes"));
// app.use("/api/settings", require("./routes/settingRoutes"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
