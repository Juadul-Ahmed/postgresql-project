import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import categoryRoutes from "./routes/category.routes";
import productRoutes from "./routes/product.routes";
import reviewRoutes from "./routes/review.routes";
import orderRoutes from "./routes/order.routes";
import { errorHandler } from "./lib/errorHandler";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API", version: "1.0.0" });
});

app.get("/debug", async (req, res) => {
  try {
    const prisma = (await import("./lib/prisma")).default;
    res.json({ success: true, message: "Prisma loaded", data: { initialized: true } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Prisma error", error: error.message, stack: error.stack });
  }
});

app.use(errorHandler);

export default app;
