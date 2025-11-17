import Project from "../../models/Project.js";
import { createInvoiceService } from "../invoice/InvoiceService.js";
import { recalcTotalAmount } from "./ProjectService.js";

export const getMilestoneByIdService = async (projectId, milestoneId, userId) => {
	const project = await Project.findOne({ _id: projectId, userId });
	if (!project) throw new Error("Project not found");

	const milestone = project.milestones.id(milestoneId);
	if (!milestone || milestone.isArchived) throw new Error("Milestone not found");

	return milestone.toJSON();
};

export const createMilestoneService = async (projectId, userId, milestoneData) => {
	console.log(projectId);
	const project = await Project.findOne({ _id: projectId, userId });
	if (!project) throw new Error("Project not found");

	project.milestones.push(milestoneData);
	recalcTotalAmount(project);

	await project.save();
	const filtered = project.milestones.filter((m) => !m.isArchived).map((m) => m.toJSON());
	return filtered;
};

export const updateMilestoneService = async (projectId, milestoneId, user, data) => {
	const { id: userId } = user;
	const project = await Project.findOne({ _id: projectId, userId });
	if (!project) throw new Error("Project not found");

	const milestone = project.milestones.id(milestoneId);
	if (!milestone) throw new Error("Milestone not found");

	if (milestone.invoiceId) {
		throw new Error("This milestone is already invoiced and cannot be modified.");
	}

	const previousCompleted = milestone.isCompleted;

	Object.assign(milestone, data);

	if (data.isCompleted && !previousCompleted) {
		milestone.isCompleted = true;
		milestone.completedAt = new Date();
		milestone.deliverables.forEach((d) => (d.status = "Completed"));

		if (milestone.generateInvoice === "on_completion") {
			const newInvoice = await createInvoiceService(user, projectId, milestoneId);
			milestone.invoiceId = newInvoice._id;
			milestone.invoicedAt = new Date();
		}
	}

	recalcTotalAmount(project);

	if (milestone.generateInvoice === "on_due_date") {
		console.log(`Invoice will be generated automatically on due date: ${milestone.dueDate}`);
	}

	const allCompleted = project.milestones.every((m) => m.isCompleted === true);
	if (allCompleted) {
		project.status = "Done";
	}

	await project.save();

	return project.milestones.id(milestoneId).toJSON();
};

export const archiveMilestoneService = async (projectId, milestoneId, userId) => {
	const project = await Project.findOne({ _id: projectId, userId });
	if (!project) throw new Error("Project not found");

	const milestone = project.milestones.id(milestoneId);
	if (!milestone) throw new Error("Milestone not found");

	milestone.isArchived = !milestone.isArchived;
	recalcTotalAmount(project);
	await project.save();

	return {
		message: milestone.isArchived ? "Milestone archived successfully" : "Milestone restored successfully",
		milestone: milestone.toJSON(),
	};
};
