import Project from "../../models/Project.js";

export const createMilestoneService = async (projectId, userId, milestoneData) => {
	const project = await Project.findOne({ _id: projectId, userId });
	if (!project) throw new Error("Project not found");

	project.milestones.push(milestoneData);
	await project.save();
	return project;
};

export const updateMilestoneService = async (projectId, milestoneId, userId, data) => {
	const project = await Project.findOne({ _id: projectId, userId });
	if (!project) throw new Error("Project not found");

	const milestone = project.milestones.id(milestoneId);
	if (!milestone) throw new Error("Milestone not found");

	Object.assign(milestone, data);
	await project.save();
	return milestone;
};

export const deleteMilestoneService = async (projectId, milestoneId, userId) => {
	const project = await Project.findOne({ _id: projectId, userId });
	if (!project) throw new Error("Project not found");

	const milestone = project.milestones.id(milestoneId);
	if (!milestone) throw new Error("Milestone not found");

	milestone.deleteOne();
	await project.save();
	return { message: "Milestone deleted successfully" };
};
