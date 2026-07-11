import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';
import {config} from "dotenv";
import fileUpload from "express-fileupload";
import {dbConnection} from "./database/db.js";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

config({path: "./config/config.env"});

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "./temp/"
}));

dbConnection();

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/message", messageRoutes);

// Serve frontend in production if build exists
const distPath = path.join(__dirname, "..", ".dist");
if (process.env.NODE_ENV === "production" && fs.existsSync(distPath)) {
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
    });
} else {
    app.get("/", (req, res) => {
        res.json({ success: true, message: "Talkie API is running successfully!" });
    });
}

export default app;
