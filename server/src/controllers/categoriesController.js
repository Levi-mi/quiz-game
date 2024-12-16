import { Category } from "../models/categoryModel.js";

const getAllCategories = async (req, res) => {
    try {
        console.log("Fetching categories...");
        const categories = await Category.find({});
        res.json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: error.message });
    }
}


export { getAllCategories }