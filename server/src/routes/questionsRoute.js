import express from 'express'
import { getQuestionsByCategory, getQuestionsRandom, getAllQuestions } from '../controllers/questionController.js';
const router = express.Router()

router.get("/all", getAllQuestions);

router.get("/random/:difficulty?", getQuestionsRandom);


router.get("/:category/:difficulty?", getQuestionsByCategory);

export default router