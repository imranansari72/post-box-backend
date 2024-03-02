import { getAll } from "../../services/postsServices.js";

const getAllPosts = (req, res, next) => {
  getAll()
    .then((posts) => {
      res.json(posts);
    })
    .catch((error) => {
      next(error);
    });
};

export default getAllPosts;
