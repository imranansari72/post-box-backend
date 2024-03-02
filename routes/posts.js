import express from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getAllPostsOfUser,
} from "../controllers/postsController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

// get all posts by user id

router.route("").get(getAllPosts);

//get all post all posts of user

router.route("/user/:userId/").get(getAllPostsOfUser);

// get post by post id 
router.route("/post/:postId").get(getPostById);

// create a new post with protection
router.route("/create").post(checkAuth, createPost);

// update a post

router.route("/update/:postId").put(checkAuth, updatePost);

// delete a post

router.route("/delete/:postId").delete(checkAuth, deletePost);

export default router;
