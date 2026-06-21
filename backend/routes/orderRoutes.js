import express from "express";
import isAuth from "../middleware/isAuth.js";
import { placeOrder } from "../controllers/orderController.js";

const orderRoutes = express.Router();

orderRoutes.post("/placeOrder", isAuth, placeOrder);

export default orderRoutes;
