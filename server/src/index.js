import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import "./db/connectToDB.js";
import indexRoute from "./routes/indexRoute.js"
import cors from "cors"

dotenv.config();

const port = process.env.PORT || 3001;

const app = express();

app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5174", "http://localhost:5173"],
    credentials: true,
}));
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.method, req.url, new Date().toLocaleTimeString());
    next();
})

app.use("/", indexRoute);

app.listen(port, () => {
    console.log('Server running on port ' + port)
})