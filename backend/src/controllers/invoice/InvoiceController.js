import {
	createInvoiceService,
	getInvoiceByIdService,
	getInvoicesService,
	updateInvoiceStatusService,
	sendInvoiceService,
} from "../../services/invoice/InvoiceService.js";

export const createInvoice = async (req, res) => {
	try {
		const { projectId, milestoneId } = req.params;

		// validate body
		const result = await createInvoiceService(req.user, projectId, milestoneId);

		res.status(201).json({ message: "Milestone created successfully", result });
	} catch (err) {
		console.error("Error creating milestone:", err);
		res.status(500).json({ message: err.message || "Internal Server Error" });
	}
};

export const getInvoices = async (req, res) => {
	try {
		const { id: userId } = req.user;
		const { projectId, page = 1, limit = 10 } = req.query;

		const data = await getInvoicesService(userId, projectId, page, limit);
		res.status(200).json(data);
	} catch (err) {
		console.error("Error fetching invoices:", err);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const getInvoiceById = async (req, res) => {
	try {
		const { id: userId } = req.user;
		const { invoiceId } = req.params;

		const result = await getInvoiceByIdService(invoiceId, userId);

		if (!result) return res.status(404).json({ message: "Invoice not found" });
		res.status(200).json(result);
	} catch (err) {
		console.error("Error fetching invoice:", err);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const updateInvoiceStatus = async (req, res) => {
	try {
		const { id: userId } = req.user;
		const { invoiceId } = req.params;
		const { status } = req.body;

		const result = await updateInvoiceStatusService(invoiceId, userId, status);
		res.status(200).json({ message: "Invoice status updated", result });
	} catch (err) {
		console.error("Error updating invoice:", err);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const sendInvoice = async (req, res) => {
	try {
		const { invoiceId } = req.params;
		const user = req.user;

		const result = await sendInvoiceService(invoiceId, user);

		res.status(200).json({
			success: true,
			message: result.message,
			sentAt: result.sentAt,
		});
	} catch (error) {
		console.error("Error sending invoice:", error);
		res.status(500).json({ success: false, message: error.message });
	}
};
