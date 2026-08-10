import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../services/user/user.service";
import { authenticate, authorize, AuthRequest } from "../lib/middleware";

const router = Router();

router.get("/", authenticate, authorize("ADMIN"), getAllUsers);
router.get("/:id", authenticate, getUserById);
router.put("/:id", authenticate, authorize("ADMIN"), updateUser);
router.delete("/:id", authenticate, authorize("ADMIN"), deleteUser);

export default router;
