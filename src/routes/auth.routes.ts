import { Router } from "express";
import { register, login, getProfile } from "../services/user/auth.service";
import { authenticate } from "../lib/middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticate, getProfile);

export default router;
