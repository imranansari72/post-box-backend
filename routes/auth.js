import express from "express";
import {
  loginController,
  signupController,
} from "../controllers/authController.js";
import checkAuth from "../middleware/checkAuth.js";
import users from "../models/users.js";

const router = express.Router();

router.post("/login", loginController);

router.post("/signup", signupController);

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({
    success: true,
    message: "Logged out successfully",
  });
});


router.get("/checkAuth", checkAuth, async (req, res) => {
  const user = await users.findById(req.userId);
  const { password, ...rest } = user._doc;
  res.json({
    success: true,
    message: "User logged in",
    user: rest,
  });
});

export default router;
