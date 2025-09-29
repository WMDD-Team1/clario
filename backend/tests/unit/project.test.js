import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Project from "../../src/models/Project";

let mongo;
beforeAll(async () => {
	mongo = await MongoMemoryServer.create();
	await mongoose.connect(mongo.getUri());
});

afterAll(async () => {
	await mongoose.disconnect();
	await mongo.stop();
});

describe("Project model test", () => {
	it("must create a project", async () => {
		const project = await Project.create({
			userId: new mongoose.Types.ObjectId(),
			clientId: new mongoose.Types.ObjectId(),
			contractId: new mongoose.Types.ObjectId(),
			title: "WMDD Term 2",
			description: "The 3rm term project",
			startDate: new Date(),
			endDate: new Date(),
		});
		expect(project.title).toBe("WMDD Term 2");
	});
});
