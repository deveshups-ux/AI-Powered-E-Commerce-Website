import express from "express";
import { registration } from "../controllers/authController.js";

const authRoutes = express.Router();

authRoutes.post("/registration", registration);

export default authRoutes;
