import QuizRecord from "../models/quizRecordModel.js";

const getAllQuizRecords = async (req, res) => {
    try {
        const { sort = 'date', order = 'desc' } = req.query;
        const sortOptions = {};
        sortOptions[sort] = order === 'desc' ? -1 : 1;

        const records = await QuizRecord.find({}).sort(sortOptions);
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch records", error: error.message });
    }
};

const createQuizRecord = async (req, res) => {
    const { userId, username, category, difficulty, score, timeTaken, correctAnswers } = req.body;
    
    // Validate required fields
    if (!userId || !username || !category || !difficulty) {
        return res.status(400).json({ 
            message: "Missing required fields", 
            required: ['userId', 'username', 'category', 'difficulty'] 
        });
    }

    try {
        const newRecord = await QuizRecord.create({ 
            userId, 
            username, 
            category, 
            difficulty, 
            score, 
            timeTaken, 
            correctAnswers,
            date: new Date()
        });
        res.status(201).json(newRecord);
    } catch (error) {
        res.status(400).json({ message: "Failed to create record", error: error.message });
    }
};

const getQuizRecordById = async (req, res) => {
    try {
        const record = await QuizRecord.findById(req.params.id);
        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch record", error: error.message });
    }
};

const updateQuizRecord = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const record = await QuizRecord.findById(id);
        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }

        const updatedRecord = await QuizRecord.findByIdAndUpdate(
            id, 
            updates,
            { new: true, runValidators: true }
        );
        res.status(200).json(updatedRecord);
    } catch (error) {
        res.status(400).json({ message: "Failed to update record", error: error.message });
    }
};

const deleteQuizRecord = async (req, res) => {
    const { id } = req.params;
    try {
        const record = await QuizRecord.findById(id);
        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }

        await QuizRecord.findByIdAndDelete(id);
        res.status(200).json({ message: "Record deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete record", error: error.message });
    }
};

const getUserHistory = async (req, res) => {
    const { userId } = req.params;

    try {
        const records = await QuizRecord.find({ userId }).sort({ date: -1 });
        
        const stats = await QuizRecord.aggregate([
            { $match: { userId } },
            { 
                $group: {
                    _id: null,
                    totalQuizzes: { $sum: 1 },
                    averageScore: { $avg: "$score" },
                    highestScore: { $max: "$score" },
                    totalTimeTaken: { $sum: "$timeTaken" },
                    averageTimeTaken: { $avg: "$timeTaken" }
                }
            }
        ]);

        res.status(200).json({
            records,
            stats: stats[0] || {
                totalQuizzes: 0,
                averageScore: 0,
                highestScore: 0,
                totalTimeTaken: 0
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch user history", error: error.message });
    }
};

const getLeaderboard = async (req, res) => {
    try {
        const { category, difficulty } = req.query;
        const filters = {};
        
        if (category) filters.category = category;
        if (difficulty) filters.difficulty = difficulty;

        const leaderboard = await QuizRecord.find(filters)
            .sort({ score: -1, timeTaken: 1 })
            .select('username score timeTaken category difficulty date');

        res.status(200).json(leaderboard);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch leaderboard", error: error.message });
    }
};

export { 
    getAllQuizRecords, 
    createQuizRecord, 
    getQuizRecordById, 
    updateQuizRecord, 
    deleteQuizRecord, 
    getUserHistory,
    getLeaderboard 
};