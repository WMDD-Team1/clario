import {
	findAllClients,
	findByClientId,
	createNewClient,
	updateClientById,
	archiveClientById,
} from "../../services/clients/ClientsService.js";

import { clientSchema } from "../../validations/clientSchema.js";

export const getAllClients = async (req, res) => {
	try {
		const { id: userId } = req.user;
		const { page = 1, limit = 10 } = req.query;

		const result = await findAllClients(userId, parseInt(page), parseInt(limit));

		res.status(200).json(result);
	} catch (err) {
		console.error("Error fetching clients: ", err);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const getClientById = async (req, res) => {
	try {
		const { id: clientId } = req.params;
		const { id: userId } = req.user;

		const result = await findByClientId(clientId, userId);

		if (!result) return res.status(404).json({ message: "Client not found" });

		res.status(200).json(result);
	} catch (err) {
		console.error("Error fetching client: ", err);

		// when cliendId is string
		if (err.name === "CastError") return res.status(400).json({ message: "Invalid client ID format" });

		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const createClient = async (req, res) => {
	try {
		const { id: userId } = req.user;
		const parsed = clientSchema.parse(req.body);
		const result = await createNewClient(parsed, userId);
		res.status(201).json(result);
	} catch (err) {
		console.error("Error creating client: ", err);
		res.status(400).json({
			message: "Invalid data",
			error: err.message,
		});
	}
};

export const updateClient = async (req, res) => {
	try {
		const { id: clientId } = req.params;
		const { id: userId } = req.user;

		// only for allowed field ? humm.. except id?
		const parsed = clientSchema.partial().parse(req.body);
		const result = await updateClientById(clientId, userId, parsed);

		if (!result) return res.status(404).json({ message: "Client not found." });

		res.status(200).json(result);
	} catch (err) {
		console.error("Error updating client: ", err);
		res.status(500).json({
			message: "Internal Server Error",
		});
	}
};

export const archiveClient = async (req, res) => {
	try {
		const { id: clientId } = req.params;
		const { id: userId } = req.user;
		const { isArchived } = req.body;

		const result = await archiveClientById(clientId, userId, isArchived);

		if (!result) return res.status(404).json({ message: "Client not found." });

		res.status(200).json({ message: `Client ${isArchived ? "archived" : "unarchived"} successfully.`, result });
	} catch (err) {
		console.error("Error archiving client: ", err);
		res.status(500).json({
			message: "Internal Server Error",
		});
	}
};
