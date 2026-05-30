import express from "express";
import isAuth from "../middleware/isAuth.js";
import { currentUser, getAdmin } from "../controllers/userController.js";
import adminAuth from "../middleware/adminAuth.js";

const userRoutes = express.Router();

userRoutes.get("/currentuser", isAuth, currentUser);
userRoutes.get("/getadmin", adminAuth, getAdmin);

export default userRoutes;
