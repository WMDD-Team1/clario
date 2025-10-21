import {
	addDeliverableService,
	updateDeliverableService,
	deleteDeliverableService,
} from "../../services/projects/DeliverableService.js";

export const addDeliverable = async (req, res) => {
	try {
		const { projectId, milestoneId } = req.params;
		const { id: userId } = req.user;
		const deliverableData = req.body;

		const milestone = await addDeliverableService(projectId, milestoneId, userId, deliverableData);
		res.status(201).json({ message: "Deliverable added successfully", milestone });
	} catch (err) {
		console.error("Error adding deliverable:", err);
		res.status(500).json({ message: err.message || "Internal Server Error" });
	}
};

export const updateDeliverable = async (req, res) => {
	try {
		const { projectId, milestoneId, deliverableId } = req.params;
		const { id: userId } = req.user;
		const data = req.body;

		const deliverable = await updateDeliverableService(projectId, milestoneId, deliverableId, userId, data);
		res.status(200).json({ message: "Deliverable updated successfully", deliverable });
	} catch (err) {
		console.error("Error updating deliverable:", err);
		res.status(500).json({ message: err.message || "Internal Server Error" });
	}
};

export const deleteDeliverable = async (req, res) => {
	try {
		const { projectId, milestoneId, deliverableId } = req.params;
		const { id: userId } = req.user;

		const result = await deleteDeliverableService(projectId, milestoneId, deliverableId, userId);
		res.status(200).json(result);
	} catch (err) {
		console.error("Error deleting deliverable:", err);
		res.status(500).json({ message: err.message || "Internal Server Error" });
	}
};
