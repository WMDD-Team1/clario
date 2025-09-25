import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { connectDB } from "../../src/config/db.js";
import User from "../../src/models/User.js";

let mongo;

beforeAll(async () => {
	mongo = await MongoMemoryServer.create();
	await connectDB(mongo.getUri());
});

afterAll(async () => {
	await mongoose.disconnect();
	await mongo.stop();
});

test("User created", async () => {
	const user = await User.create({
		auth0Id: "auth0|111",
		userType: "Freelancer",
		email: "bitna@gmail.com",
	});

	expect(user.id).toBeDefined();
});
