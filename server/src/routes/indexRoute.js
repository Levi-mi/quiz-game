import express from "express"
import categoriesRoutes from "./categoriesRoute.js"
import questionsRoutes from "./questionsRoute.js"
import authRoutes from "../routes/authRoutes.js";
import recordsRoutes from "../routes/recordsRoutes.js";
const router = express.Router()

router.use("/auth", authRoutes)
router.use("/categories", categoriesRoutes)
router.use("/questions", questionsRoutes)
router.use("/records", recordsRoutes)

export default router