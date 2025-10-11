import Project from "../../models/Project.js";

// CRUD
export const findAllProjects = async (userId, page, limit) => {
	const skip = (page - 1) * limit;
	const [projects, total] = await Promise.all([
		Project.find({ userId }).skip(skip).limit(limit).sort({ name: 1 }).populate("clientId", "name _id"),
		Project.countDocuments({ userId }),
	]);

	const data = projects.map((project) => ({
		...project.toJSON(),
		clientName: project.clientId?.name || null,
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
