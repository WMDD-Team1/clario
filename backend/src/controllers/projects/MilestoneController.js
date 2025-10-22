import {
	createMilestoneService,
	updateMilestoneService,
	deleteMilestoneService,
} from "../../services/projects/MilestoneService.js";

export const createMilestone = async (req, res) => {
	try {
		const { projectId } = req.params;
		const { id: userId } = req.user;
		const milestoneData = req.body;

		const project = await createMilestoneService(projectId, userId, milestoneData);
		res.status(201).json({ message: "Milestone created successfully", project });
	} catch (err) {
		console.error("Error creating milestone:", err);
		res.status(500).json({ message: err.message || "Internal Server Error" });
	}
};

export const updateMilestone = async (req, res) => {
	try {
		const { projectId, milestoneId } = req.params;
		const { id: userId } = req.user;
		const data = req.body;

		const milestone = await updateMilestoneService(projectId, milestoneId, userId, data);
		res.status(200).json({ message: "Milestone updated successfully", milestone });
	} catch (err) {
		console.error("Error updating milestone:", err);
		res.status(500).json({ message: err.message || "Internal Server Error" });
	}
};

export const deleteMilestone = async (req, res) => {
	try {
		const { projectId, milestoneId } = req.params;
		const { id: userId } = req.user;

		const result = await deleteMilestoneService(projectId, milestoneId, userId);
		res.status(200).json(result);
	} catch (err) {
		console.error("Error deleting milestone:", err);
		res.status(500).json({ message: err.message || "Internal Server Error" });
	}
};
