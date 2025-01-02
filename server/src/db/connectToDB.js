import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const connectToDB = async () => {
  try {
    console.log("db is connecting...")
    await mongoose.connect(process.env.MONGO_URI)
    console.log("db is connected")
  } catch (error) {
    console.log(error)
  }
}

connectToDB();

