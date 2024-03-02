import e from "express";
import users from "../assets/data.js";

const getAll = () => {
  return new Promise((resolve, reject) => {
    const posts = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        posts: user.posts,
      };
    });
    if (posts.length > 0) {
      resolve(posts);
    }
    reject(new Error("There is no posts yet."));
  });
};

const getByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => {
      return user.id === Number(userId);
    });
    if (user) {
      const { password, ...data } = user;
      resolve(data);
    }
    reject(new Error("User not found"));
  });
};

const getByPostId = (userId, postId) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => {
      return user.id === Number(userId);
    });
    if (user) {
      const post = user.posts.find((post) => {
        return post.id === Number(postId) ;
      });
      if (post) {
        resolve(post);
      }
    }
    reject(new Error("Post not found"));
  });
};

// create post with promises

const createNewPost = (userId, post) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => {
      return user.id === Number(userId);
    });
    if (user) {
      user.posts.push({
        id: user.posts.length + 1,
        ...post,
      });
      resolve();
    }
    reject(new Error("User not found"));
  });

}



export { getAll, getByUserId, getByPostId, createNewPost };
