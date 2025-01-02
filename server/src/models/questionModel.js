import mongoose from 'mongoose';
const { Schema } = mongoose;

const QuestionSchema = new Schema({
  category: String,
  question: String,
  options: [String],
  answer: Number
});

export const Question = mongoose.model('Question', QuestionSchema);
