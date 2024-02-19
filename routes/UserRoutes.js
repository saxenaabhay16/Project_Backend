const express = require("express");
const UserController = require("..//controller/UserController");
const router = express.Router();

router.post("/register", UserController.register);
router.put("/update/password", UserController.updatePassword);
router.get("/:username", UserController.getProfileByUsername);
router.get("", UserController.getAllUsers);
router.delete("/:username", UserController.deleteProfileByUsername);

module.exports = router;
