import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import { setupSwagger } from "./swagger.js";

dotenv.config();

// Mongodb
const MONGO_URI = process.env.MONGO_URI;
connectDB(MONGO_URI);

const app = express();
const PORT = process.env.PORT || 3000;

// json, body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log
app.use(morgan("dev"));

// Enable CORS only if CORS_ENABLED=true
if (process.env.CORS_ENABLED === "true") {
	app.use(cors({ origin: "http://localhost:5173" })); // for frontend in dev
}

app.use("/api", testRoutes);

// Swagger
setupSwagger(app);

app.listen(PORT, () => {
	console.log(`App is running on port ${PORT}`);
});
