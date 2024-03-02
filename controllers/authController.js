import Users from "../models/users.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/secretToken.js";

const signupController = async (req, res, next) => {
  if (req.cookies.token) {
    return res.json({
      success: false,
      message: "User already logged in",
    });
  }
  try {
    const { name, email, password } = req.body;
    const existingUser = await Users.exists({ email });
    console.log("existingUser", existingUser);
    if (existingUser) {
      return res.status(200).json({ message: "User already exists" });
    }
    const user = await Users.create({ name, email, password });
    const token = generateToken(user);
    res.cookie("token", token, { httpOnly: false, withCredentials: true });
    res.json({
      success: true,
      message: "User created successfully",
      user: {
        email: user.email,
        name: user.name,
        _id: user._id,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  if (req.cookies.token) {
    return res.json({
      success: false,
      message: "User already logged in",
    });
  }
  console.log('body',req.body)
  if (!req.body.email || !req.body.password) {
    return res.json({
      success: false,
      message: "All fields are required",
    });
  }
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const auth = await bcrypt.compare(req.body.password, user.password);
    if (!auth) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const token = generateToken(user);
    res.cookie("token", token, { httpOnly: false, withCredentials: true });
    const userId = user._id;
    console.log("userId", userId);

    res.json({
      success: true,
      message: "User logged in successfully",
      user: {
        email: user.email,
        name: user.name,
        _id: user._id,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.log("error", error);
    return res.json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// const loginController = (req, res, next) => {
//   const { email, password } = req.body;
//   if (!req.body || !email || !password) {
//     next(new Error("Provide email and password"));
//   }

//   authServices
//     .authentateUser(email, password)
//     .then((user) => {
//       res.status(200).json(user);
//     })
//     .catch((error) => {
//       next(error);
//     });
// };

// const signupController = (req, res, next) => {
//   console.log("req.body", req.body);
//   if (!req.body) {
//     next(new Error("Invalid data"));
//   }
//   authServices
//     .signupNewUser(req.body)
//     .then((user) => {
//       res.status(200).json(user);
//     })
//     .catch((error) => {
//       next(error);
//     });
// };

export { loginController, signupController };
