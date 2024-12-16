import QuizRecord from "../models/quizRecordModel.js";

const getAllQuizRecords = async (req, res) => {
    try {
        const records = await QuizRecord.find({});
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch records", error: error.message });
    }
};

const createQuizRecord = async (req, res) => {
    const { userId, username, category, difficulty, score, timeTaken, correctAnswers } = req.body;
    try {
        const newRecord = await QuizRecord.create({ userId, username, category, difficulty, score, timeTaken, correctAnswers });
        res.status(201).json(newRecord);
    } catch (error) {
        res.status(400).json({ message: "Failed to create record", error: error.message });
    }
};

const getQuizRecordById = async (req, res) => {
    try {
        const record = await QuizRecord.findById(req.params.id);
        if (!record) return res.status(404).json({ error: 'Record not found' });
        res.json(record);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateQuizRecord = async (req, res) => {
    const { id } = req.params;
    const { category, difficulty, score, timeTaken, correctAnswers } = req.body;
    try {
        const updatedRecord = await QuizRecord.findByIdAndUpdate(id, { category, difficulty, score, timeTaken, correctAnswers }, { new: true });
        res.status(200).json(updatedRecord);
    } catch (error) {
        res.status(500).json({ message: "Failed to update record", error: error.message });
    }
};

const deleteQuizRecord = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRecord = await QuizRecord.findByIdAndDelete(id);
        res.status(200).json({ message: "Record deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete record", error: error.message });
    }
};

const getUserHistory = async (req, res) => {
    try {
        const records = await QuizRecord.find({ userId: req.params.userId });
        res.json(records);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get leaderboard
/*export const getLeaderboard = async (req, res) => {
    try {
        const { category, difficulty, limit } = req.query;
        const filters = {};
        if (category) filters.category = category;
        if (difficulty) filters.difficulty = difficulty;

        const leaderboard = await QuizRecord.find(filters).sort({ score: -1 }).limit(Number(limit) || 10);
        res.json(leaderboard);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};export */

// Get player history


export { getAllQuizRecords, createQuizRecord, getQuizRecordById, updateQuizRecord, deleteQuizRecord, getUserHistory };