import Client from "../../models/Client.js";

// CRUD
export const findAllClients = async (userId, page, limit) => {
	const skip = (page - 1) * limit;
	const [clients, total] = await Promise.all([
		Client.find({ userId }).skip(skip).limit(limit).sort({ name: 1 }).populate("projects", "_id"),
		Client.countDocuments({ userId }),
	]);

	const data = clients.map((client) => ({
		...client.toJSON(),
		projectCount: client.projects?.length || 0,
	}));

	return {
		data,
		meta: {
			total,
			page,
			limit,
			totalPages: Math.ceil(total / limit),
		},
	};
};

export const findByClientId = async (id, userId) => {
	return await Client.findOne({ _id: id, userId }).populate({
		path: "projects",
		select: "_id name",
	});
};

export const createNewClient = async (data, userId) => {
	return await Client.create({
		...data,
		userId,
	});
};

export const updateClientById = async (id, userId, data) => {
	return await Client.findOneAndUpdate(
		{
			_id: id,
			userId,
		},
		data,
		{ new: true }
	);
};

export const archiveClientById = async (id, userId, isArchived) => {
	return await Client.findOneAndUpdate(
		{
			_id: id,
			userId,
		},
		{ isArchived },
		{ new: true }
	);
};
