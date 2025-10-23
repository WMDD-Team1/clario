import Client from "../../models/Client.js";

// CRUD
export const findAllClients = async (userId, query = {}) => {
	const { page = 1, limit = 10, search = "", sortBy = "name", sortOrder = "asc", viewType = "all" } = query;

	const skip = (page - 1) * limit;

	// filter
	const filter = { userId };
	if (viewType === "archived") filter.isArchived = true;
	else if (viewType === "active") filter.isArchived = false;

	// search
	if (search.trim()) {
		const regex = new RegExp(search, "i");
		filter.$or = [{ name: regex }, { email: regex }, { phone: regex }, { "address.country": regex }];
	}

	// sort
	const sortOptions = {};
	const validSortFields = ["name"];
	if (validSortFields.includes(sortBy)) {
		sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;
	} else {
		sortOptions.name = 1;
	}

	const [clients, total] = await Promise.all([
		Client.find(filter)
			.skip(skip)
			.limit(limit)
			.sort(sortOptions)
			.populate({ path: "projects", select: "_id name isArchived" })
			.populate({ path: "invoices", select: "_id totalAmount" }),
		Client.countDocuments(filter),
	]);

	let data = clients.map((client) => ({
		...client.toJSON(),
		projectCount: client.projects?.filter((p) => !p.isArchived)?.length || 0,
		invoiceCount: client.invoices?.length || 0,
	}));

	if (["projectCount", "invoiceCount"].includes(sortBy)) {
		const dir = sortOrder === "asc" ? 1 : -1;
		data.sort((a, b) => (a[sortBy] - b[sortBy]) * dir);

		data = data.slice((page - 1) * limit, page * limit);
	}

	return {
		data,
		meta: {
			total,
			page: Number(page),
			limit: Number(limit),
			totalPages: Math.ceil(total / limit),
		},
	};
};

export const findByClientId = async (id, userId) => {
	return await Client.findOne({ _id: id, userId })
		.populate({ path: "projects", select: "_id name isArchived" })
		.populate({ path: "invoices", select: "_id totalAmount status" });
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

export const updateClientById = async (id, userId, payload) => {
	return await Client.findOneAndUpdate(
		{
			_id: id,
			userId,
		},
		payload,
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
