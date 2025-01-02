import mongoose from 'mongoose';
const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: String,
  code: String
});

export const Category = mongoose.model('Category', CategorySchema);
