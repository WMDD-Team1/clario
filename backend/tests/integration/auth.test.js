import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import User from "../../src/models/User.js";

jest.mock("../../src/middlewares/checkJWT.js", () => {
	checkJWT: (req, res, next) => {
		req.auth = { sub: "auth0|test", email: "mock@example.com" };
		next();
	};
});

let mongo;

beforeAll(async () => {
	mongo = await MongoMemoryServer.create();
	await mongoose.connect(mongo.getUri());
});

afterAll(async () => {
	await mongoose.disconnect();
	await mongo.stop();
});

test("Signup API creates a new user", async () => {
	const response = await request(app).post("/api/auth/signup").send({
		userType: "Freelancer",
		province: "BC",
		currency: "CAD",
	});

	expect(response.status).toBe(201);
	expect(response.body).toHaveProperty("auth0Id", "auth0|test123");

	const user = await User.findOne({ auth0Id: "auth0|test123" });
	expect(user).not.toBeNull();
	expect(user.userType).toBe("Freelancer");
});
