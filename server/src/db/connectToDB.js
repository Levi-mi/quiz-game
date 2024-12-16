import mongoose from "mongoose"
const connectToDB = async () => {
  try {
    console.log("db is connecting...")
    await mongoose.connect("mongodb+srv://User:aA123456@cluster0.4cfey.mongodb.net/Quiz?retryWrites=true&w=majority&appName=Cluster0/Quiz"
)
    console.log("db is connected")
  } catch (error) {
    console.log(error)
  }
}

connectToDB();

