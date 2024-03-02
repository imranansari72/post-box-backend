import { createNewPost } from "../../services/postsServices.js";

const createPost = (req, res) => {
  const userId = Number(req.params.userId);
  const body = req.body;

  // check data
  if (!body || !body.title || !body.image) {
    res.status(400).json({ error: true, message: "Invalid data" });
    return;
  }
  createNewPost(userId, body)
    .then(() => {
      res.json({ message: "Post created successfully" });
    })
    .catch((error) => {
      next(error);
    });
};

export default createPost;
