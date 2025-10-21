import fs from "fs";
import Invoice from "../../models/Invoice.js";
import Project from "../../models/Project.js";
import { generateInvoicePDF } from "../invoice/generateInvoicePDF.js";
import { getTaxRateByProvince } from "../../utils/tax.js";
import { uploadToFirebase } from "../../utils/uploadFile.js";

export const createInvoiceService = async (userId, province, projectId, milestoneId) => {
	const project = await Project.findById(projectId);
	if (!project) throw new Error("Project not found");

	const milestone = project.milestones.id(milestoneId);
	if (!milestone) throw new Error("Milestone not found");

	const lastInvoice = await Invoice.findOne().sort({ createdAt: -1 });
	const invoiceNumber = lastInvoice ? lastInvoice.invoiceNumber + 1 : 1;

	const taxRate = getTaxRateByProvince(province);
	const taxAmount = milestone.amount * taxRate;
	const totalAmount = milestone.amount + taxAmount;

	const currentDate = new Date();
	const dueDate = new Date(currentDate);
	dueDate.setDate(currentDate.getDate() + 30);

	const newInvoice = await Invoice.create({
		invoiceNumber,
		projectId,
		milestoneId,
		clientId: project.clientId._id,
		userId,
		clientName: project.clientId.name,
		milestoneName: milestone.name,
		dueDate,
		deliverables: milestone.deliverables.map((item) => ({ name: item.name })),
		amount: milestone.amount,
		taxAmount,
		totalAmount,
	});

	const pdfPath = await generateInvoicePDF(newInvoice);

	const pdfFile = {
		buffer: fs.readFileSync(pdfPath),
		mimetype: "application/pdf",
		originalname: `invoice_${newInvoice.invoiceNumber}.pdf`,
		size: fs.statSync(pdfPath).size,
	};

	const uploaded = await uploadToFirebase(pdfFile, "invoices");

	newInvoice.fileUrl = uploaded.fileUrl;
	await newInvoice.save();
	fs.unlinkSync(pdfPath);

	return newInvoice;
};
