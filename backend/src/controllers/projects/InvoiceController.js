import { createInvoiceService } from "../../services/projects/InvoiceService.js";

export const createInvoice = async (req, res) => {
	try {
		const { projectId, milestoneId } = req.params;
		const { id: userId, province } = req.user;

		// validate body
		const result = await createInvoiceService(userId, province, projectId, milestoneId);

		res.status(201).json({ message: "Milestone created successfully", result });
	} catch (err) {
		console.error("Error creating milestone:", err);
		res.status(500).json({ message: err.message || "Internal Server Error" });
	}
};
