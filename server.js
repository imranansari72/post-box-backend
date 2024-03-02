import express from "express";
import dotenv from "dotenv/config";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";

import userRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import postsRouter from "./routes/posts.js";
import profileRouter from "./routes/profile.js";

// import posts from "./models/posts.js";
// import users from "./models/users.js";

import multerUpload from "./middleware/multerHandler.js";

const app = express();

// connect to mongodb
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("error in connecting", err));

// posts.collection.drop().then(() => {
//   console.log("posts collection dropped");
// });

// users.collection.drop().then(() => {
//   console.log("users collection dropped");
// });

// middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", multerUpload.single("img"), postsRouter);
app.use("/api/profile", profileRouter);

// error handling middleware
app.use((err, req, res, next) => {
  console.log("err in next", err);
  return res.status(500).json({ success: false, message: err.message });
});

app.use(
  "*",
  (req, res, next) => {
    res.status(404).json({ success: false, message: "Not Found" });
  },
  (req, res) => {
    res.status(404).json({ success: false, message: "Not Found" });
  }
);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// Path: package.jso
