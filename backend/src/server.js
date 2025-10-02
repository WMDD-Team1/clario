import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { app } from "./app.js";

dotenv.config();

connectDB(process.env.MONGO_URI);
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`App is running on port ${port}`);
});
