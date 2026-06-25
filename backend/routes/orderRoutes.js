import express from "express";
import isAuth from "../middleware/isAuth.js";
import adminAuth from "../middleware/adminAuth.js";
import {
  allOrders,
  placeOrder,
  updateStatus,
  userOrders,
} from "../controllers/orderController.js";

const orderRoutes = express.Router();

//for User
orderRoutes.post("/placeorder", isAuth, placeOrder);
orderRoutes.post("/userorder", isAuth, userOrders);

//for admin

orderRoutes.post("/list", adminAuth, allOrders);
orderRoutes.post("/status", adminAuth, updateStatus);

export default orderRoutes;
