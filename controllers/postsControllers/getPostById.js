import { getByPostId, getByUserId } from "../../services/postsServices.js";

const getPostById = (req, res, next) => {
  const { postId } = req.query;
  if (!postId) {
    getByUserId(req.params.userId)
      .then((post) => {
        res.json(post);
      })
      .catch((error) => {
        next(error);
      });
  } else {
    getByPostId(req.params.userId, postId)
      .then((post) => {
        res.json(post);
      })
      .catch((error) => {
        next(error);
      });
  }
};

export default getPostById;
