import express from "express";
import { register, login, logout, getInfo } from "../controllers/authController.js";
import authMiddleware, { authAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/info", authMiddleware, getInfo);
router.get("/logout", logout);

export default router;