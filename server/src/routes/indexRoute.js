import express from "express"
import categoriesRoutes from "./categoriesRoute.js"
import questionsRoutes from "./questionsRoute.js"
import authRoutes from "../routes/authRoutes.js";
const router = express.Router()

router.use("/auth", authRoutes)
router.use("/categories", categoriesRoutes)
router.use("/questions", questionsRoutes)

export default router