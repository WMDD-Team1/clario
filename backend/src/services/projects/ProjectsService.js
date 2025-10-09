import Project from "../../models/Project.js";

// CRUD
export const findAllProjects = async (userId) => {
	const skip = (page - 1) * limit;
	const [projects, total] = await Promise.all([
		Project.find({ userId }).skip(skip).limit(limit),
		Project.countDocuments({ userId }),
	]);

	return { projects, total, page, limit };
};

export const findByPorjectId = async (id, userId) => {
	return await Project.findOne({ _id: id, userId }).populate("clientId");
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

export const deleteProjectById = async (id, userId) => {
	return await Project.findOneAndDelete({
		_id: id,
		userId,
	});
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
