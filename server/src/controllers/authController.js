import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.create({ username, email, password });
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(400).json({ message: "registration failed", error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie("access_token", "Bearer " + token, {
            httpOnly: true,
            secure: true,
        })

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message });
    }
};

const getInfo = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.user._id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch user info", error: error.message });
    }
};

const logout = (req, res) => {
    res.clearCookie("access_token", {
        httpOnly: true,
        secure: true
    });
    res.status(200).json({ message: "Logged out successfully" });
};

export { register, login, getInfo, logout };