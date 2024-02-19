const Post = require("../models/Post");
const User = require("../models/User");
const { ObjectId } = require("mongodb");

//creating a new post
async function createNewPost(req, res) {
  try {
    const { title, body } = req.body;
    const userId = new ObjectId(req.body.userId);
    const user = User.findById(userId);
    if (!user) {
      console.log(`user id : ${userId} not exists`);
      return res
        .status(404)
        .json({ message: `user id : ${userId} not exists` });
    }
    const post = new Post({ title, body, userId });
    await post.save();
    console.log("Post saved successfully in db.");
    return res.status(201).json({ message: "Post saved successfully" });
  } catch (error) {
    console.error("Unable to create a post. Error : ", error.message);
    return res.status(500).json({ error: error.message });
  }
}

//update existing post by postId
async function updatePostById(req, res) {
  try {
    const postId = new ObjectId(req.params.postId);
    const post = await Post.findOne({ _id: postId }).exec();
    if (!post) {
      console.log("Post with id", postId, " Not found in db.");
      return res
        .status(404)
        .json({ message: `Post with id ${postId} not exist in db.` });
    }
    post.title = req.body.title;
    post.body = req.body.body;
    await post.save();
    console.log(`Post with id:${postId} successfully updated.`);
    return res
      .status(200)
      .json({ message: `Post with id:${postId} successfully updated.` });
  } catch (error) {
    console.error("Unable to update a post. Error : ", error.message);
    return res.status(500).json({ error: error.message });
  }
}

//retrieve post by postId
async function getPostById(req, res) {
  try {
    const postId = new ObjectId(req.params.postId);
    const post = await Post.findOne({ _id: postId }).exec();
    console.log(`Post with id:${postId} successfully retrieved.`);
    return res.status(200).json(post);
  } catch (error) {
    console.error("Unable to get post. Error : ", error.message);
    return res.status(500).json({ error: error.message });
  }
}

//retrieve all posts
async function getAllPost(req, res) {
  try {
    const posts = await Post.find({}).exec();
    console.log(`All posts successfully retrieved.`);
    return res.status(200).json(posts);
  } catch (error) {
    console.error("Unable to retrieve posts. Error : ", error.message);
    return res.status(500).json({ error: error.message });
  }
}

//retrieve all posts
async function getAllPostByUserId(req, res) {
  try {
    const userId = new ObjectId(req.params.userId);
    const posts = await Post.find({ userId: userId }).exec();
    console.log(
      `All posts successfully retrieved for user with id : ${userId}`
    );
    return res.status(200).json(posts);
  } catch (error) {
    console.error("Unable to retrieve posts. Error : ", error.message);
    return res.status(500).json({ error: error.message });
  }
}

async function deletePostById(req, res) {
  try {
    const postIdToDelete = new ObjectId(req.params.postId);
    const result = await Post.deleteOne({ _id: postIdToDelete }).exec();

    if (result.deletedCount === 1) {
      console.log(`Post with ID ${postIdToDelete} deleted successfully.`);
      return res.status(200).json({
        message: `Post with ID ${postIdToDelete} deleted successfully.`,
      });
    }
    console.log(`Post with ID ${postIdToDelete} not found.`);
    return res.status(404).json({ error: "Post not found" });
  } catch (error) {
    console.error("Unable to delete a post. Error : ", error.message);
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createNewPost,
  updatePostById,
  getPostById,
  getAllPost,
  deletePostById,
  getAllPostByUserId,
};
