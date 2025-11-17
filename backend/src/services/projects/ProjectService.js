import Project from "../../models/Project.js";
import Client from "../../models/Client.js";
import Contract from "../../models/Contract.js";
import { uploadToFirebase } from "../../utils/fileHandler.js";

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
	const validSortFields = ["createdAt", "startDate", "dueDate", "totalAmount"];

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

	const contract = await Contract.findOne({ projectId: id, userId });

	const data = project.toJSON();

	if (data.milestones && Array.isArray(data.milestones)) {
		data.milestones = data.milestones.filter((m) => !m.isArchived);
	}

	data.contract = contract ? contract.toJSON() : null;

	return data;
};

export const createNewProject = async (data, file, userId) => {
	const project = await Project.create({
		...data,
		userId,
		status: data.status || "Planning",
		milestones: [],
		isArchived: data.isArchived ?? false,
		isActive: !!file,
		totalAmount: data.upfrontAmount || 0,
	});

	let projectJSON = project.toJSON();

	if (!file) {
		projectJSON.contract = null;
		return projectJSON;
	}

	const { fileName, fileUrl, fileType, size } = await uploadToFirebase(file, "contracts/original");

	const contract = await Contract.create({
		userId,
		clientId: data.clientId,
		projectId: project._id,
		contractName: fileName,
		contractUrl: fileUrl,
		fileType,
		size,
	});

	projectJSON.contract = contract.toJSON();

	return projectJSON;
};

export const updateProjectById = async (id, userId, data) => {
	const project = await Project.findOne({ _id: id, userId });
	if (!project) throw new Error("Project not found");

	Object.assign(project, data);

	recalcTotalAmount(project);

	await project.save();

	return project;
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

	const totalAmount = projects.reduce((sum, p) => sum + (p.totalAmount || 0), 0);
	const activeProjects = projects.filter((p) => p.isActive && !p.isArchived);
	const activeAmount = activeProjects.reduce((sum, p) => sum + (p.totalAmount || 0), 0);

	const inactiveProjects = projects.filter((p) => !p.isActive && !p.isArchived);
	const archivedProjects = projects.filter((p) => p.isArchived);

	return {
		total: totalAmount,
		active: activeAmount,
		inactive: inactiveProjects.length,
		archived: archivedProjects.length,
		clients: clients.length,
	};
};

export const recalcTotalAmount = (project) => {
	const upfront = Number(project.upfrontAmount ?? 0);

	const milestonesTotal = project.milestones
		.filter((m) => !m.isArchived)
		.reduce((sum, m) => sum + Number(m.amount || 0), 0);

	project.totalAmount = upfront + milestonesTotal;
};
