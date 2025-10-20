import Client from "../../models/Client.js";

// CRUD
export const findAllClients = async (userId, page, limit) => {
	const skip = (page - 1) * limit;
	const [clients, total] = await Promise.all([
		Client.find({ userId }).skip(skip).limit(limit).sort({ name: 1 }).populate({ path: "projects" }),
		// .populate("invoices")
		Client.countDocuments({ userId }),
	]);

	const data = clients.map((client) => ({
		...client.toJSON(),
		projectCount: client.projects?.length || 0,
		invoiceCount: client.invoices?.length || 0,
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
	const data = await Client.findOne({ _id: id, userId }).populate({
		path: "projects",
		select: "_id name",
	});

	return data?.toJSON();
};

export const createNewClient = async (payload, userId) => {
	const data = await Client.create({
		...payload,
		userId,
	});
	return {
		...data.toJSON(),
		projectCount: 0,
		invoiceCount: 0,
	};
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
