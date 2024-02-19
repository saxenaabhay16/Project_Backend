const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const BlacklistedToken = require("../models/BlacklistedToken");
const { SECRET_KEY } = require("../constant");

//login functionality
async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log("Invalid username or password");
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    console.log(username, " logged in successully.");
    return res.status(200).json({ token });
  } catch (error) {
    console.error(
      "Exception occur during jwt creation. Exception: ",
      error.message
    );
    return res.status(500).json({ error: error.message });
  }
}

//logout functionality
async function logout(req, res) {
  const { token } = req.body;
  if (!token) {
    console.log("Token is required for logout");
    return res.status(400).json({ error: "Token is required for logout" });
  }
  // Check if the token is blacklisted
  const isTokenBlacklisted = await BlacklistedToken.exists({ token });

  if (isTokenBlacklisted) {
    console.log("Token is already blacklisted");
    return res.status(400).json({ error: "Token is already blacklisted" });
  }
  // Add the token to the blacklist in MongoDB
  await BlacklistedToken.create({ token });

  console.log("Logout successful.Token blacklisted:", token);
  return res.status(200).json({ message: "Logout successful" });
}

module.exports = { login, logout };
