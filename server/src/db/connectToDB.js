import mongoose from "mongoose"
const connectToDB = async () => {
  try {
    console.log("db is connecting...")
    await mongoose.connect("mongodb://localhost:27017/levi")
    console.log("db is connected")
  } catch (error) {
    console.log(error)
  }
}

connectToDB();

