import {
	getDeliverableByIdService,
	addDeliverableService,
	updateDeliverableService,
	deleteDeliverableService,
} from "../../services/projects/DeliverableService.js";

export const getDeliverableById = async (req, res) => {
	try {
		const { projectId, milestoneId, deliverableId } = req.params;
		const { id: userId } = req.user;

		const data = await getDeliverableByIdService(projectId, milestoneId, deliverableId, userId);

		res.status(200).json({
			message: "Deliverable retrieved successfully",
			data,
		});
	} catch (err) {
		console.error("Error fetching deliverable:", err);
		res.status(404).json({ message: err.message });
	}
};

export const addDeliverable = async (req, res) => {
	try {
		const { projectId, milestoneId } = req.params;
		const { id: userId } = req.user;
		const data = req.body;
		const file = req.file;

		const deliverable = await addDeliverableService(projectId, milestoneId, userId, data, file);
		res.status(201).json({ message: "Deliverable added successfully", deliverable });
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
		const file = req.file;

		const deliverable = await updateDeliverableService(projectId, milestoneId, deliverableId, userId, data, file);
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
