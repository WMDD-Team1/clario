import Project from "../../models/Project.js";
import Client from "../../models/Client.js";

// CRUD
export const findAllProjects = async (userId, query = {}) => {
	const {
		page = 1,
		limit = 10,
		search = "",
		sortBy = "createdAt",
		sortOrder = "desc",
		status,
		isActive,
		archived,
	} = query;
	const skip = (page - 1) * limit;

	const filter = { userId };

	if (archived === "true") filter.isArchived = true;
	else if (archived === "false") filter.isArchived = false;

	if (isActive === "true") filter.isActive = true;
	else if (isActive === "false") filter.isActive = false;

	if (status) filter.status = status;

	if (search.trim()) {
		const clientMatches = await Client.find({
			name: { $regex: search, $options: "i" },
			userId,
		}).select("_id");

		const clientIds = clientMatches.map((c) => c._id);

		filter.$or = [{ name: { $regex: search, $options: "i" } }, { clientId: { $in: clientIds } }];
	}

	const sortOptions = {};
	const validSortFields = ["createdAt", "startDate", "dueDate", "totalBudget", "milestonesCount"];

	if (validSortFields.includes(sortBy)) {
		sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;
	} else {
		sortOptions.createdAt = -1;
	}

	const [projects, total] = await Promise.all([
		Project.find(filter).populate("clientId", "name _id").skip(skip).limit(Number(limit)).sort(sortOptions),
		Project.countDocuments(filter),
	]);
	const data = projects.map((p) => ({
		...p.toJSON(),
		clientName: p.clientId?.name || null,
		milestonesCount: p.milestones?.length || 0,
	}));
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

export const findByProjectId = async (id, userId) => {
	return await Project.findOne({ _id: id, userId }).populate({
		path: "clientId",
		select: "_id name email",
	});
};

export const createNewProject = async (data, userId) => {
	return await Project.create({
		...data,
		userId,
		status: data.status || "Planning",
		isArchived: data.isArchived ?? false,
		milestones: data.milestones || [],
	});
};

export const updateProjectById = async (id, userId, data) => {
	return await Project.findOneAndUpdate(
		{
			_id: id,
			userId,
		},
		data,
		{ new: true }
	);
};

export const archiveProjectById = async (id, userId, isArchived) => {
	return await Project.findOneAndUpdate(
		{
			_id: id,
			userId,
		},
		{ isArchived },
		{ new: true }
	);
};
