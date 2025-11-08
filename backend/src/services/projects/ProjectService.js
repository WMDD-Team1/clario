import Project from "../../models/Project.js";
import Client from "../../models/Client.js";
import Contract from "../../models/Contract.js";

// CRUD
export const findAllProjects = async (userId, query = {}) => {
	const {
		page = 1,
		limit = 10,
		search = "",
		sortBy = "createdAt",
		sortOrder = "desc",
		status,
		viewType = "All",
	} = query;
	const skip = (page - 1) * limit;
	const filter = { userId };

	if (viewType === "active") filter.isActive = true;
	else if (viewType === "archived") filter.isArchived = true;

	if (status && status !== "All") {
		filter.status = status;
	}

	const searchQuery = search.trim();
	if (searchQuery) {
		const regex = new RegExp(searchQuery, "i");
		const clientMatches = await Client.find({
			name: regex,
			userId,
		}).select("_id");

		const clientIds = clientMatches.map((c) => c._id);

		filter.$or = [{ name: regex }, { clientId: { $in: clientIds } }];
	}

	const sortOptions = {};
	const validSortFields = ["createdAt", "startDate", "dueDate", "totalBudget"];

	if (validSortFields.includes(sortBy)) {
		sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;
	} else {
		sortOptions.createdAt = -1;
	}

	const [total, projects] = await Promise.all([
		Project.countDocuments(filter),
		Project.find(filter).populate("clientId", "name _id").skip(skip).limit(Number(limit)).sort(sortOptions),
	]);

	let data = projects.map((p) => ({
		...p.toJSON(),
		milestonesCount: p.milestones?.length || 0,
	}));

	if (sortBy === "milestonesCount") {
		data = data.sort((a, b) =>
			sortOrder === "asc" ? a.milestonesCount - b.milestonesCount : b.milestonesCount - a.milestonesCount
		);
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

export const findByProjectId = async (id, userId) => {
	const project = await Project.findOne({ _id: id, userId }).populate({
		path: "clientId",
		select: "_id name email",
	});
	if (!project) return null;

	const contract = await Contract.findOne({ projectId: id, userId }).select(
		"_id contractName contractUrl status fileType size createdAt updatedAt"
	);
	const data = project.toJSON();
	data.contract = contract ? contract.toJSON() : null;

	return data;
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

export const getOverviewService = async (userId) => {
	const [projects, clients] = await Promise.all([Project.find({ userId }), Client.find({ userId })]);

	const totalBudget = projects.reduce((sum, p) => sum + (p.totalBudget || 0), 0);
	const activeProjects = projects.filter((p) => p.isActive && !p.isArchived);
	const activeBudget = activeProjects.reduce((sum, p) => sum + (p.totalBudget || 0), 0);

	const inactiveProjects = projects.filter((p) => !p.isActive && !p.isArchived);
	const archivedProjects = projects.filter((p) => p.isArchived);

	return {
		total: totalBudget,
		active: activeBudget,
		inactive: inactiveProjects.length,
		archived: archivedProjects.length,
		clients: clients.length,
	};
};
