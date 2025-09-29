import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Client from "../../src/models/Client";

let mongo;
beforeAll(async () => {
	mongo = await MongoMemoryServer.create();
	await mongoose.connect(mongo.getUri());
});

afterAll(async () => {
	await mongoose.disconnect();
	await mongo.stop();
});

describe("Client model test", () => {
	it("must create a client", async () => {
		const client = await Client.create({
			userId: new mongoose.Types.ObjectId(),
			type: "Individual",
			name: "Langara College",
			email: "beel79@mylangara.ca",
			phone: "123-211-1111",
			address: "Langara College",
			country: "CA",
			contracts: [new mongoose.Types.ObjectId()],
			projects: [new mongoose.Types.ObjectId()],
		});
		expect(client.country).toBe("CA");
	});
});
