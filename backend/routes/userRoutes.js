import express from "express";
import isAuth from "../middleware/isAuth.js";
import { currentUser } from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.get("/currentuser", isAuth, currentUser);

export default userRoutes;
