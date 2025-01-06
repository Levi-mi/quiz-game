import mongoose from "mongoose";

const quizRecordSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard', 'expert', 'random'],
        required: true
    },
    score: {
        type: Number,
        required: true,
    },
    timeTaken: {
        type: Number,
        required: true
    },
    correctAnswers: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    randomQuestions: {
        type: Boolean,
        default: false
    }
});

const QuizRecord = mongoose.model("QuizRecord", quizRecordSchema);

export default QuizRecord;