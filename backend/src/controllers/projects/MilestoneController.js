import {
	createMilestoneService,
	updateMilestoneService,
	archiveMilestoneService,
	getMilestoneByIdService,
} from "../../services/projects/MilestoneService.js";

export const getMilestoneById = async (req, res) => {
	try {
		const { projectId, milestoneId } = req.params;
		const { id: userId } = req.user;

		const milestone = await getMilestoneByIdService(projectId, milestoneId, userId);
		res.status(200).json({ data: milestone });
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

export const createMilestone = async (req, res) => {
	try {
		const { projectId } = req.params;
		const { id: userId } = req.user;
		const data = req.body;

		const project = await createMilestoneService(projectId, userId, data);
		res.status(201).json({ message: "Milestone created successfully", project });
	} catch (err) {
		console.error("Error creating milestone:", err);
		res.status(400).json({ message: err.message });
	}
};

export const updateMilestone = async (req, res) => {
	try {
		const { projectId, milestoneId } = req.params;
		const data = req.body;

		const milestone = await updateMilestoneService(projectId, milestoneId, req.user, data);
		res.status(200).json({ message: "Milestone updated successfully", milestone });
	} catch (err) {
		console.error("Error updating milestone:", err);
		res.status(400).json({ message: err.message });
	}
};

export const archiveMilestone = async (req, res) => {
	try {
		const { projectId, milestoneId } = req.params;
		const { id: userId } = req.user;

		const result = await archiveMilestoneService(projectId, milestoneId, userId);
		res.status(200).json(result);
	} catch (err) {
		console.error("Error deleting milestone:", err);
		res.status(500).json({ message: err.message || "Internal Server Error" });
	}
};
