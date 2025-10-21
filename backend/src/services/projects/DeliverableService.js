import Project from "../../models/Project.js";

export const addDeliverableService = async (projectId, milestoneId, userId, deliverableData) => {
	const project = await Project.findOne({ _id: projectId, userId });
	if (!project) throw new Error("Project not found");

	const milestone = project.milestones.id(milestoneId);
	if (!milestone) throw new Error("Milestone not found");

	milestone.deliverables.push(deliverableData);
	await project.save();
	return milestone;
};

export const updateDeliverableService = async (projectId, milestoneId, deliverableId, userId, data) => {
	const project = await Project.findOne({ _id: projectId, userId });
	if (!project) throw new Error("Project not found");

	const milestone = project.milestones.id(milestoneId);
	if (!milestone) throw new Error("Milestone not found");

	const deliverable = milestone.deliverables.id(deliverableId);
	if (!deliverable) throw new Error("Deliverable not found");

	Object.assign(deliverable, data);
	await project.save();
	return deliverable;
};

export const deleteDeliverableService = async (projectId, milestoneId, deliverableId, userId) => {
	const project = await Project.findOne({ _id: projectId, userId });
	if (!project) throw new Error("Project not found");

	const milestone = project.milestones.id(milestoneId);
	if (!milestone) throw new Error("Milestone not found");

	const deliverable = milestone.deliverables.id(deliverableId);
	if (!deliverable) throw new Error("Deliverable not found");

	deliverable.deleteOne();
	await project.save();
	return { message: "Deliverable deleted successfully" };
};
