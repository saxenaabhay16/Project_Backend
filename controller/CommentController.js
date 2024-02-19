const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const { ObjectId } = require("mongodb");

async function commentOnPost(req, res) {
  try {
    const userId = new ObjectId(req.params.userId);
    const postId = new ObjectId(req.params.postId);
    const commentMsg = req.body.commentMsg;

    const user = await User.findOne({ _id: userId }).select("_id").exec();
    const post = await Post.findOne({ _id: postId }).select("_id").exec();
    if (!user || !post) {
      console.log(
        `${userId} or ${postId} is incorrect.Please try with valid ids.`
      );
      return res.status(500).json({
        message: `${userId} or ${postId} is incorrect.Please try with valid ids.`,
      });
    }
    const comment = new Comment({ commentMsg, userId, postId });
    console.log("comment:", comment);
    await comment.save();
    console.log(
      `Comment saved successfully by userId:${userId} on postId:${postId}.`
    );
    return res.status(201).json({
      message: `Comment saved successfully by userId:${userId} on postId:${postId}.`,
    });
  } catch (error) {
    console.error("Unable to comment on post. Error : ", error.message);
    return res.status(500).json({ error: error.message });
  }
}

async function updateCommentById(req, res) {
  try {
    const userId = new ObjectId(req.params.userId);
    const postId = new ObjectId(req.params.postId);
    console.log("userId : ", userId);
    const commentMsg = req.body.commentMsg;

    const comment = await Comment.findOne({
      $and: [{ userId: { $eq: userId } }, { postId: { $eq: postId } }],
    })
      .select("_id")
      .exec();
    console.log("commentId : ", comment);
    if (!comment) {
      console.log(`no comments made by user:${userId} on post:${postId}`);
      return res.status(404).json({
        message: `no comment made by user:${userId} on post:${postId}`,
      });
    }
    comment.commentMsg = commentMsg;
    await comment.save();
    console.log("comment updated successfully");
    return res.status(200).json("comment updated successfully");
  } catch (error) {
    console.error(
      "Something went wrong with comment update. Error : ",
      error.message
    );
    return res.status(500).json({ error: error.message });
  }
}

async function getCommentById(req, res) {
  try {
    const commentId = new ObjectId(req.params.commentId);
    const comment = await Comment.findOne({ _id: commentId });
    if (!comment) {
      console.log(`Comment:${commentId} not found.`);
      return res
        .status(404)
        .json({ message: `Comment:${commentId} not found.` });
    }
    console.log(`comment:${commentId} retrieved successfully`);
    return res.status(200).json(comment);
  } catch (error) {
    console.error("Unable to fetch comment. Error : ", error.message);
    return res.status(500).json({ error: error.message });
  }
}

async function getAllComment(req, res) {
  try {
    const comments = await Comment.find({});
    console.log(`comments retrieved successfully`);
    return res.status(200).json(comments);
  } catch (error) {
    console.error("Unable to fetch all comments. Error : ", error.message);
    return res.status(500).json({ error: error.message });
  }
}

async function getAllCommentsByUserId(req, res) {
  try {
    console.log("inside getAllcommentsByuserId");
    const userId = new ObjectId(req.params.userId);
    const user = await User.findOne({ _id: userId });
    if (!user) {
      console.log(`user : ${userId} not found`);
      return res.status(404).json({ message: `user : ${userId} not found` });
    }
    const comments = await Comment.find({ userId: userId });
    if (!comments) {
      console.log(`user : ${user.name} haven't made any comment`);
      return res
        .status(404)
        .json({ message: `user : ${user.name} haven't made any comment` });
    }
    console.log(`comments by user : ${userId} retrieved successfully`);
    return res.status(200).json(comments);
  } catch (error) {
    console.error("something went wrong. Error : ", error.message);
    return res.status(500).json({ error: error.message });
  }
}

async function getAllCommentsOnPost(req, res) {
  try {
    const postId = new ObjectId(req.params.postId);
    const comments = await Comment.find({ postId: postId });
    if (!comments) {
      console.log(`comments not found on post:${postId}`);
      return res
        .status(404)
        .json({ message: `comments not found on post:${postId}` });
    }
    console.log(`comments retrieved successfully for postId : ${postId}`);
    return res.status(200).json(comments);
  } catch (error) {
    console.log("Unable to retrieve comments on post");
    return res.status(500).json({
      message: `Unable to retrieve comments on post.Error : ${error.message}`,
    });
  }
}

async function deleteCommentById(req, res) {
  try {
    const commentId = new ObjectId(req.params.commentId);
    const result = await Comment.deleteOne({ _id: commentId });
    if (result.deletedCount === 1) {
      console.log(`comment:${commentId} deleted successfully`);
      return res
        .status(200)
        .json({ message: `comment: ${commentId} deleted successfully.` });
    }
    console.log(`Comment:${commentId} not found.`);
    return res.status(404).json({ message: `Comment:${commentId} not found.` });
  } catch (error) {
    console.error("Unable to comment on post. Error : ", error.message);
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  commentOnPost,
  updateCommentById,
  getCommentById,
  getAllComment,
  getAllCommentsByUserId,
  getAllCommentsOnPost,
  deleteCommentById,
};
