import { Question } from "../models/questionModel.js";

const getAllQuestions = async (req, res) => {
    try {
        console.log("Fetching categories...");
        const questions = await Question.find({});
        res.status(200).json(questions);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: error.message });
    }
}

const getQuestionsRandom = async (req, res) => {
    try {
        console.log("Fetching 10 random questions...");

        const { difficulty } = req.params;

        // Build the aggregation pipeline
        const pipeline = [];

        // If difficulty is provided and not "random", filter by it
        if (difficulty && difficulty !== "random") {
            pipeline.push({
                $match: { difficulty: difficulty }
            });
        }

        // Randomly sample 10 questions
        pipeline.push({
            $sample: { size: 10 }
        });

        // Execute the aggregation pipeline
        const questions = await Question.aggregate(pipeline);

        res.status(200).json(questions);
    } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).json({ message: error.message });
    }
}

const getQuestionsByCategory = async (req, res) => {
    try {
        console.log("Fetching category and difficulty...");

        const { category, difficulty } = req.params;

        let query = { category: category };

        // If difficulty is provided and it's NOT "random", add it to the query
        if (difficulty && difficulty !== "random") {
            query.difficulty = difficulty;
        }

        // Use aggregation to handle random sampling for "random" difficulty
        let questions;
        if (difficulty === "random") {
            questions = await Question.aggregate([
                { $match: { category: category } }, // Match category
                { $sample: { size: 10 } }           // Randomly sample 10 questions
            ]);
        } else {
            questions = await Question.find(query).limit(10);
        }

        res.json(questions);
    } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).json({ message: error.message });
    }
}

export { getQuestionsByCategory, getQuestionsRandom, getAllQuestions }