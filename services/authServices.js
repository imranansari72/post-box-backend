import users from "../assets/data.js";
import userDetails from "../assets/userDetails.js";

const authentateUser = (email, password) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => {
      return user.email === email && user.password === password;
    });
    if (user) {
      const { password, ...data } = user;
      userDetails.isLogin = true;
      userDetails.user = data;
      resolve(userDetails);
    }
    reject(new Error("Invalid Email or Password"));
  });
};

const signupNewUser = (user) => {
  return new Promise((resolve, reject) => {
    const userExists = users.find((u) => {
      return u.email === user.email;
    });
    if (!userExists) {
      users.push({
        id: users.length + 1,
        ...user,
        posts: [],
      });
      resolve(authentateUser(user.email, user.password));
    }
    reject(new Error("Email already exists"));
  });
};

//logout

const logoutUser = () => {
  return new Promise((resolve, reject) => {
    if (userDetails.isLogin) {
      userDetails.isLogin = false;
      userDetails.user = {};
      resolve(userDetails);
    }
    reject(new Error("User is not logged in"));
  });
};

//wirth promises

export default { authentateUser, signupNewUser, logoutUser };
