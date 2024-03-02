import express from "express";
import Users from "../models/users.js";
import mongoose from "mongoose";

const router = express.Router();
//get all users using promises
router.route("/").get((req, res, next) => {
  Users.find({})
    .then((users) => {
      res.json(
        users.map((user) => {
          return {
            id: user._id,
            name: user.name,
            profilePicture: user.profilePicture,
            email: user.email,
          };
        })
      );
    })
    .catch((error) => {
      next(error);
    });
});

router.route("/:userId").get(async (req, res, next) => {
  const userId = req.params.userId.trim();
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    next(new Error("Invalid user id"));
    return;
  }
  console.log("userId", typeof userId);
  const user = await Users.findById(userId);
  if (!user) {
    next(new Error("User not found"));
    return;
  }
  res.json(user);
});

export default router;
