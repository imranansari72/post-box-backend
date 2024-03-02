import jwt from "jsonwebtoken";

const checkAuth = (req, res, next) => {
  //cookie
  console.log("req.cookies", req.cookies);
  // decode token find user
  const token = req.cookies.token;
  console.log("token", token);
  if (!token) {
    return res.json({
      success: false,
      message: "User not logged in",
    });
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  console.log("decodedToken", decodedToken);
  const userId = decodedToken.id;
  console.log("user", userId);
  req.userId = userId;
  next();
};

export default checkAuth;
