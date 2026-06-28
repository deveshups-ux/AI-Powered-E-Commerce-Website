import dotenv from "dotenv";
dotenv.config();
import express from "express";
let app = express();
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

let port = process.env.PORT || 6000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://onecart-frontend-rjar.onrender.com", "https://onecart-admin-atki.onrender.com"],
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

app.listen(port, () => {
  console.log(`sever is running on ${port} port`);
  connectDb();
});
