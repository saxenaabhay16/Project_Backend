const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { ObjectId } = require("mongodb");

//register a user
async function register(req, res) {
  try {
    const { name, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, username, password: hashedPassword });
    await user.save();
    console.log(username, "saved successfully in db.");
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Unable to register user. Error : ", error.message);
    return res.status(500).json({ error: error.message });
  }
}

//update password functionality
async function updatePassword(req, res) {
  try {
    const { username, currentPassword, newPassword } = req.body;
    // Retrieve the user from the database
    const user = await User.findOne({ username: username }).exec();
    console.log("user :", user);
    if (!user) {
      console.log(username, " not found");
      return res.status(404).json({
        message: "Invalid " + username + " Please provide valid userId",
      });
    }
    // Check if the current password is correct
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      console.log("Invalid current password");
      return res.status(401).json({ error: "Invalid current password" });
    }
    // Hash and update the password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    user.updatedAt = new Date();
    await user.save();
    console.log("Password changed successfully");
    return res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Unable to update password. Error : ", error.message);
    return res.status(500).json({ error: error.message });
  }
}

// Retrieve the user from the database
async function getProfileByUsername(req, res) {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username: username }).exec();
    if (!user) {
      console.log(username, " not found");
      return res.status(404).json({
        message: "Invalid " + username + " Please provide valid userId",
      });
    }
    //hide password in response
    const responseWithoutPassword = {
      id: user.id,
      name: user.name,
      createdAt: user.createdAt,
      updateAt: user.updatedAt,
    };

    console.log(username, " retrieved successfully.");
    return res.status(200).json(responseWithoutPassword);
  } catch (error) {
    console.error("Unable to retrieve user. Error : ", error.message);
    return res.status(500).json({ error: error.message });
  }
}

//get all users
async function getAllUsers(req, res) {
  try {
    const users = await User.find({}).select("_id name createdAt updatedAt");
    console.log("Users retrieved successfully");
    return res.status(200).json(users);
  } catch (error) {
    console.log(`Unable to retrieved all users`);
    return res
      .status(500)
      .json(`Unable to retrieve all users. Error ; ${error.message}`);
  }
}

// Delete the user from the database
async function deleteProfileByUsername(req, res) {
  try {
    const userIdToDelete = req.params.username;
    const result = await User.deleteOne({ username: userIdToDelete });

    if (result.deletedCount === 1) {
      console.log(`User with ID ${userIdToDelete} deleted successfully.`);
      return res.status(200).json({
        message: `User with ID ${userIdToDelete} deleted successfully.`,
      });
    }
    console.log(`User with ID ${userIdToDelete} not found.`);
    return res.status(404).json({ error: "User not found" });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  register,
  updatePassword,
  getProfileByUsername,
  getAllUsers,
  deleteProfileByUsername,
};
