const User = require("../models/User");
const Wallet = require("../models/Wallet");
const uuid = require("uuid").v4;
const bcrypt = require("bcryptjs");
exports.register = async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    // Hash the password before saving (example using bcrypt)
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword, phone });
    await user.save();
    if (user) {
      const address = uuid().replace(/-/g, "");
      const wallet = new Wallet({
        userId: user._id,
        name: user.name,
        address: address,
        balance: 0,
        eth: 0, // 1.8 * 3500 = $6,300
        btc: 0, // 0.025 * 65000 = $1,625
        usdc: 0, // 1200 * 1 = $1,200
        matic: 0, // 250 * 1.2 = $300
      });
      await wallet.save();

      if (wallet) {
        user.wallet = wallet.address;
        await user.save();
        res.status(201).json(user);
      }
    }
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    res.json({ message: "Login successful", user: user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// exports.updateProfile = async (req, res) => {
//   const user = await User.findOne();
//   user.profile = req.body.profile;
//   await user.save();
//   res.json(user);
// };
