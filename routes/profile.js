import express from "express";
import users from "../models/users.js";
import sharp from "sharp";

import multerUpload from "../middleware/multerHandler.js";

import fs from "fs";
import path from "path";

import checkAuth from "../middleware/checkAuth.js";
import multer from "multer";

const router = express.Router();

router.put("/name", checkAuth, async (req, res, next) => {
  try {
    const updatedUser = await users.findByIdAndUpdate(req.userId, {
      $set: { name: req.body.name },
    });
    console.log("in name put :: (updatedUser)", updatedUser);
    if (!updatedUser) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
      message: "Name updated successfully",
      data: {
        name: req.body.name,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put("/profilepicture", multerUpload.single('profilePicture') , checkAuth, async (req, res, next) => {
  try {
    console.log("req.file", req.file);
    const newProfilePicture = await sharp(req.file.path)
      .resize(500, 500)
      .jpeg({ quality: 50 })
      .toBuffer();
    //deleting original image
    // fs.unlink(__dirname + "/uploads/" + req.file.filename, (err) => {
    //   if (err) {
    //     console.log(err);
    //   }
    // });

    const updatedUser = await users.findByIdAndUpdate(req.userId, {
      $set: {
        profilePicture: {
          data: newProfilePicture,
          contentType: req.file.mimetype,
        },
      },
    });
    if (!updatedUser) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
      message: "Profile picture updated successfully",
      data: {
        profilePicture: {
          data: newProfilePicture,
          contentType: req.file.mimetype,
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put("/coverpicture", checkAuth, async (req, res, next) => {
  try {
    const newCoverPicture = await sharp(req.file.path)
      .resize(500, 500)
      .jpeg({ quality: 50 })
      .toBuffer();
    //deleting original image
    fs.unlink(__dirname + "/uploads/" + req.file.filename, (err) => {
      if (err) {
        console.log(err);
      }
    });

    const updatedUser = await users.findByIdAndUpdate(req.userId, {
      $set: {
        coverPicture: {
          data: newCoverPicture,
          contentType: req.file.mimetype,
          data: newCoverPicture,
        },
      },
    });
    if (!updatedUser) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
      message: "Cover picture updated successfully",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
