const express = require("express");
const CommentController = require("..//controller/CommentController");
const router = express.Router();

router.post("/user/:userId/post/:postId", CommentController.commentOnPost);
router.put(
  "/update/user/:userId/post/:postId",
  CommentController.updateCommentById
);
router.get("/:commentId", CommentController.getCommentById);
router.get("", CommentController.getAllComment);
router.get("/user/:userId", CommentController.getAllCommentsByUserId);
router.get("/post/:postId", CommentController.getAllCommentsOnPost);
router.delete("/:commentId", CommentController.deleteCommentById);

module.exports = router;
