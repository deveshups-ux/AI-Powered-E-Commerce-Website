import validator from "validator";
import bcrypt from "bcryptjs";
import User from "../model/userModel.js";
import { genToken } from "../config/token.js";

export const registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter Valid Email" });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Enter Strong Password" });
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "user already exists" });
    }
    let hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashPassword });
    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json(user);
  } catch (error) {
    console.log("registration error", error);

    return res.status(500).json({ message: `registration Error ${error}` });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "both fields are required" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter Valid Email" });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not exists" });
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "username or password incorrect" });
    }
    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Login error ${error}` });
  }
};

export const logOut = (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "logOut successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `logOut error ${error}` });
  }
};

export const googleLogin = async (req, res) => {
  try {
    let { name, email } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email });
    }
    let token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Google Login Error ${error}` });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      let token = await genToken(email);
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.status(200).json(token);
    }
    return res.status(400).json({ message: "Invalid Credentials" });
  } catch (error) {
    console.log("Admin Login Error");
    return res.status(500).json({ message: `Admin login error ${error}` });
  }
};
