import {
	findAllClients,
	findByClientId,
	createNewClient,
	updateClientById,
	archiveClientById,
} from "../../services/clients/ClientsService.js";

export const getAllClients = async (req, res) => {
	try {
		const { sub: userId } = req.auth;
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
		const { sub: userId } = req.auth;

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
		const { sub: userId } = req.auth;
		const result = await createNewClient(req.body, userId);

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
		const { sub: userId } = req.auth;

		// only for allowed field ? humm.. except id?
		const result = await updateClientById(clientId, userId, req.body);

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
		const { sub: userId } = req.auth;
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
