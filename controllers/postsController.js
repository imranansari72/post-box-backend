import posts from "../models/posts.js";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import sharp from "sharp";

const __dirname = path.resolve();

const getAllPosts = async (req, res, next) => {
  try {
    console.log("req.user");
    const allPosts = await posts.find();
    //sort post by time
    allPosts.sort((p1, p2) => {
      return new Date(p2.createdAt) - new Date(p1.createdAt);
    });
    res.json(allPosts);
  } catch (error) {
    next(error);
  }
};

const getPostById = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.postId)) {
    return res.json({
      success: false,
      message: "Invalid post id",
    });
  }
  try {
    const post = await posts.findById(req.params.postId);
    res.json(post);
  } catch (error) {
    next(error);
  }
};

const createPost = async (req, res, next) => {
  console.log("req.user", req.userId);
  try {
    const desc = req.body.desc ? req.body.desc : "";

    // const imgdata = await sharp(__dirname + "/" + )
    //   .resize(500, 500)
    //   .jpeg({ quality: 50 })
    //   .toBuffer();
    // console.log(__dirname + "/uploads/" + req.file.filename);
    // console.log("req.file", req.file.path);
    // res.json({ success: true, message: "Post created successfully" })

    //resizing image
    const imgdata = await sharp(req.file.path)
      .resize(500, 500)
      .jpeg({ quality: 50 })
      .toBuffer();
    //deleting original image

    fs.unlink(__dirname + "/uploads/" + req.file.filename, (err) => {
      if (err) {
        console.log(err);
      }
    });

    if (!imgdata && desc === "") {
      return res.json({ success: false, message: "Please enter something" });
    }
    const newPost = new posts({
      userId: req.userId,
      desc: desc,
      img: {
        data: imgdata,
        contentType: req.file.mimetype,
      },
    });
    const savedPost = await newPost.save();
    res.json({
      success: true,
      message: "Post created successfully",
      data: savedPost,  
    });
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    // //makin id to moongose object id
    // const postId = new mongoose.Types.ObjectId(req.params.postId);
    const post = await posts.findById(req.params.postId);
    console.log("post", post);
    if (post.userId !== req.userId) {
      return res.json({
        success: false,
        message: "You are not authorized to update this post",
      });
    } else {
      const updatedPost = await posts.findByIdAndUpdate(req.params.postId, {
        $set: req.body,
      });
      res.json({
        success: true,
        message: "Post updated successfully",
        data: updatedPost,
      });
    }
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const postToDelete = await posts.findById(req.params.postId);
    if (postToDelete.userId !== req.userId) {
      return res.json({
        success: false,
        message: "You are not authorized to delete this post",
      });
    }
    const deletedPost = await posts.deleteOne({ _id: req.params.postId });
    res.json({
      success: true,
      message: "Post deleted successfully",
      data: deletedPost,
    });
  } catch (error) {
    next(error);
  }
};

const getAllPostsOfUser = async (req, res, next) => {
  try {
    const allPosts = await posts.find({ userId: req.params.userId });
    //sort post by time
    allPosts.sort((p1, p2) => {
      return new Date(p2.createdAt) - new Date(p1.createdAt);
    });
    res.json(allPosts);
  } catch (error) {
    next(error);
  }
};

export {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getAllPostsOfUser,
};
