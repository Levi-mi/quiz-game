import mongoose from "mongoose";
import bcrypt from "bcrypt"; // Ensure bcrypt is properly imported

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    cityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "City",
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (err) {
        next(err);
    }
});

export default mongoose.model("User", userSchema);
