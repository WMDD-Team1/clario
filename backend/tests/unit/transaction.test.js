import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Transacation from "../../src/models/Transacation";

let mongo;
beforeAll(async () => {
	mongo = await MongoMemoryServer.create();
	await mongoose.connect(mongo.getUri());
});

afterAll(async () => {
	await mongoose.disconnect();
	await mongo.stop();
});
describe("Transaction model test", () => {
	it("must create an income transaction with metadata", async () => {
		const tx = await Transacation.create({
			userId: new mongoose.Types.ObjectId(),
			projectId: new mongoose.Types.ObjectId(),
			type: "income",
			category: "Deposit",
			amount: 10000,
			date: new Date(),
			metadata: {
				orcExtractedText: "Invoice-123",
				clientMemo: "WMDD-4820",
			},
		});
		expect(tx.type).toBe("income");
		expect(tx.metadata.clientMemo).toBe("WMDD-4820");
	});
});
