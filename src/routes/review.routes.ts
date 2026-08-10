import { Router } from "express";
import {
  getReviewsByProduct,
  createReview,
  updateReview,
  deleteReview,
} from "../services/review/review.service";
import { authenticate, AuthRequest } from "../lib/middleware";

const router = Router();

router.get("/product/:productId", getReviewsByProduct);
router.post("/product/:productId", authenticate, createReview);
router.put("/:id", authenticate, updateReview);
router.delete("/:id", authenticate, deleteReview);

export default router;
