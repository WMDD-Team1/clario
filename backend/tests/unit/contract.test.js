import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Contract from "../../src/models/Contract";

let mongo;
beforeAll(async () => {
	mongo = await MongoMemoryServer.create();
	await mongoose.connect(mongo.getUri());
});

afterAll(async () => {
	await mongoose.disconnect();
	await mongo.stop();
});

describe("Contract model test", () => {
	it("must create a contract", async () => {
		const ct = await Contract.create({
			userId: new mongoose.Types.ObjectId(),
			clientId: new mongoose.Types.ObjectId(),
			projectId: new mongoose.Types.ObjectId(),
			contractUrl: "www.firebasestorage.com/d123123",
			totalAmount: 10000,
			paymentTerms: "1/2",
			deliveryDate: new Date(),
			aiAnalysis: {
				riskyCluases: ["This is test data", "testing at home"],
				suggestions: ["be prepared", "keep it mind"],
			},
		});
		expect(ct.aiAnalysis.suggestions[0]).toBe("be prepared");
	});
});
