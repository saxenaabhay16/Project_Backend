const express = require("express");
const PostController = require("..//controller/PostController");
const router = express.Router();

router.post("/createNewPost", PostController.createNewPost);
router.put("/update/:postId", PostController.updatePostById);
router.get("/:postId", PostController.getPostById);
router.get("", PostController.getAllPost);
router.get("/user/:userId", PostController.getAllPostByUserId);
router.delete("/:postId", PostController.deletePostById);

module.exports = router;
