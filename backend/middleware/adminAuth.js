import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    let { token } = req.cookies;
    if (!token) {
      return res.status(400).json({ message: "Not Authorizes Login Again" });
    }
    let verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      return res
        .status(400)
        .json({ message: "Not Authorized , Invalid Token" });
    }
    req.adminEmail = process.env.ADMIN_EMAIL;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Token invalid ya expire ho gaya" });
  }
};

export default adminAuth;
