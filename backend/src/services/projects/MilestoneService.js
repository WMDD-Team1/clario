import Project from "../../models/Project.js";
import { createInvoiceService } from "../invoice/InvoiceService.js";

export const getMilestoneByIdService = async (projectId, milestoneId, userId) => {
	const project = await Project.findOne({ _id: projectId, userId });
	if (!project) throw new Error("Project not found");

	const milestone = project.milestones.id(milestoneId);
	if (!milestone) throw new Error("Milestone not found");

	return milestone.toJSON();
};

export const createMilestoneService = async (projectId, userId, milestoneData) => {
	const project = await Project.findOne({ _id: projectId, userId });
	if (!project) throw new Error("Project not found");

	project.milestones.push(milestoneData);
	await project.save();
	return project;
};

export const updateMilestoneService = async (projectId, milestoneId, user, data) => {
	const { id: userId } = user;
	const project = await Project.findOne({ _id: projectId, userId });
	if (!project) throw new Error("Project not found");

	const milestone = project.milestones.id(milestoneId);
	if (!milestone) throw new Error("Milestone not found");

	const previousCompleted = milestone.isCompleted;

	Object.assign(milestone, data);
	if (data.isCompleted === true) {
		milestone.deliverables.forEach((d) => (d.status = "Completed"));
	}

	// invoice trigger
	const { generateInvoice, dueDate } = milestone;

	// on_completion
	if (data.isCompleted && !previousCompleted) {
		milestone.deliverables.forEach((d) => (d.status = "Completed"));

		if (generateInvoice === "on_completion") {
			await createInvoiceService(user, projectId, milestoneId);
		}
	}
	// need to implement on_due_date
	if (generateInvoice === "on_due_date") {
		console.log(`Invoice will be generated automatically on due date: ${dueDate}`);
	}

	const allCompleted = project.milestones.every((m) => m.isCompleted === true);
	if (allCompleted) {
		project.status = "Done";
	}
	await project.save();
	return milestone.toJSON();
};

export const archiveMilestoneService = async (projectId, milestoneId, userId) => {
	const project = await Project.findOne({ _id: projectId, userId });
	if (!project) throw new Error("Project not found");

	const milestone = project.milestones.id(milestoneId);
	if (!milestone) throw new Error("Milestone not found");

	milestone.isArchived = !milestone.isArchived;
	await project.save();

	return {
		message: milestone.isArchived ? "Milestone archived successfully" : "Milestone restored successfully",
		milestone: milestone.toJSON(),
	};
};
