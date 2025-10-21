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

	const previousStatus = milestone.status;

	Object.assign(milestone, data);
	await project.save();

	// invoice trigger
	const { generateInvoice, status, dueDate } = milestone;
	// on_completion
	if (generateInvoice === "on_completion" && status === "Completed" && previousStatus !== "Completed") {
		await createInvoiceService(userId, project.province, projectId, milestoneId);
	}
	if (generateInvoice === "on_due_date" && new Date() >= new Date(dueDate)) {
		await createInvoiceService(userId, project.province, projectId, milestoneId);
	}
	return project;
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
