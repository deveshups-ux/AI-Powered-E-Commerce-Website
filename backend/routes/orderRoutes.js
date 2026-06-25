import express from "express";
import isAuth from "../middleware/isAuth.js";
import adminAuth from "../middleware/adminAuth.js";
import { placeOrder, userOrders } from "../controllers/orderController.js";

const orderRoutes = express.Router();

//for User
orderRoutes.post("/placeorder", isAuth, placeOrder);
orderRoutes.post("/userorder", isAuth, userOrders);

export default orderRoutes;
