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
		auth0Id: "GMstVXbM75LIhkNzxIAoUAQ2e0PV8qRv@clients",
		email: "bitna@gmail.com",
		name: "Bitna Lee",
	});

	expect(user.id).toBeDefined();
	expect(user.name).toBe("Bitna Lee");
});
