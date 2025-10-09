import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Client from "../../src/models/Client.js";
import * as ClientService from "../../src/services/clients/clientsService.js";
import "../../src/models/Project.js";

let mongoServer;

beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create();
	const uri = mongoServer.getUri();
	await mongoose.connect(uri);
});

afterAll(async () => {
	await mongoose.disconnect();
	await mongoServer.stop();
});

describe("Client Service Unit Test", () => {
	let userId;
	let clientId;

	beforeEach(async () => {
		userId = new mongoose.Types.ObjectId();
		const client = await Client.create({
			userId,
			type: "Individual",
			name: "Test Client",
			email: "test@client.com",
		});
		clientId = client._id;
	});

	afterEach(async () => {
		await Client.deleteMany({});
	});

	it("should create a new client", async () => {
		const data = {
			type: "Company",
			name: "New Client Company",
			email: "client@newco.com",
		};

		const newClient = await ClientService.createNewClient(data, userId);

		expect(newClient).toHaveProperty("_id");
		expect(newClient.name).toBe("New Client Company");
		expect(newClient.userId.toString()).toBe(userId.toString());
	});

	it("should return all clients with pagination", async () => {
		const result = await ClientService.findAllClients(userId, 1, 10);
		expect(result.data.length).toBeGreaterThan(0);
		expect(result.meta.total).toBeGreaterThan(0);
	});

	it("should find client by ID", async () => {
		const result = await ClientService.findByClientId(clientId, userId);
		expect(result).not.toBeNull();
		expect(result.name).toBe("Test Client");
	});

	it("should update client info", async () => {
		const updated = await ClientService.updateClientById(clientId, userId, {
			name: "Updated Client",
		});
		expect(updated.name).toBe("Updated Client");
	});

	it("should archive a client", async () => {
		const archived = await ClientService.archiveClientById(clientId, userId, true);
		expect(archived.isArchived).toBe(true);
	});
});
