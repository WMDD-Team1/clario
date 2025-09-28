import mongoose from "mongoose";

export const connectDB = async (mongoUri) => {
	try {
		await mongoose.connect(mongoUri);

		mongoose.connection.on("connected", () => {
			console.log("Mongoose connected: ", mongoUri);
		});
		mongoose.connection.on("error", (err) => {
			console.error("Mongoose connection error: ", err);
		});
		mongoose.connection.on("disconnected", () => {
			console.log("Mongoose disconnected");
		});
	} catch (err) {
		console.log("MongoDB connection failed:  ", err);
		process.exit(1);
	}
};
