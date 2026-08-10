import { Router } from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
} from "../services/order/order.service";
import { authenticate, authorize, AuthRequest } from "../lib/middleware";

const router = Router();

router.get("/", authenticate, getAllOrders);
router.get("/:id", authenticate, getOrderById);
router.post("/", authenticate, createOrder);
router.put("/:id/status", authenticate, authorize("ADMIN"), updateOrderStatus);
router.delete("/:id", authenticate, authorize("ADMIN"), deleteOrder);

export default router;
