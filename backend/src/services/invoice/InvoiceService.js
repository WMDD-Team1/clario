import fs from "fs";
import Invoice from "../../models/Invoice.js";
import Project from "../../models/Project.js";
import { generateInvoicePDF } from "../../utils/generateHTML.js";
import { getTaxRateByProvince } from "../../utils/tax.js";
import { uploadToFirebase } from "../../utils/fileHandler.js";
import Transaction from "../../models/Transaction.js";
import Client from "../../models/Client.js";

export const createInvoiceService = async (user, projectId, milestoneId) => {
	const project = await Project.findById(projectId);
	if (!project) throw new Error("Project not found");

	const client = await Client.findById(project.clientId);
	if (!client) throw new Error("Client not found");

	const { id: userId, name, email, phone, address } = user;
	const { province } = user.settings.finance;

	let invoiceAmount = 0;
	let milestoneName = "Upfront Payment";
	let deliverables = [];

	if (milestoneId) {
		const milestone = project.milestones.id(milestoneId);
		if (!milestone) throw new Error("Milestone not found");
		invoiceAmount = milestone.amount;
		milestoneName = milestone.name;
		deliverables = milestone.deliverables.map((d) => ({ name: d.name, description: d.description || "" }));
	} else if (project.upfrontAmount > 0) {
		invoiceAmount = project.upfrontAmount;
	}

	const lastInvoice = await Invoice.findOne().sort({ createdAt: -1 });
	const invoiceNumber = lastInvoice ? lastInvoice.invoiceNumber + 1 : 1;

	const taxRate = getTaxRateByProvince(province);
	const taxAmount = invoiceAmount * taxRate;
	const totalAmount = invoiceAmount + taxAmount;

	const dueDate = new Date();
	dueDate.setDate(dueDate.getDate() + 7);

	const newInvoice = await Invoice.create({
		invoiceNumber,
		projectId,
		milestoneId,
		clientId: project.clientId._id,
		userId,
		clientName: client.name,
		milestoneName,
		dueDate,
		deliverables,
		amount: invoiceAmount,
		taxAmount,
		totalAmount,
	});

	const invoiceData = {
		invoiceNumber: newInvoice.invoiceNumber,
		status: newInvoice.status || "Pending",
		issueDate: new Date(newInvoice.createdAt).toISOString().split("T")[0],
		dueDate: newInvoice.dueDate.toISOString().split("T")[0],

		billFrom: {
			name: name || "User",
			email: email || "",
			phone: phone || "",
			// addressLine1: address?.street || "",
			// addressLine2: `${address?.city || ""}, ${address?.postalCode || ""}`,
			country: address?.country || "Canada",
			// taxId: `Tax (${province})`,
		},

		billTo: {
			company: client?.name || "Client",
			email: client?.email || "",
			phone: client?.phone || "",
			addressLine1: client?.address?.street || "",
			addressLine2: `${client?.address?.city || ""}, ${client?.address?.postalCode || ""}`,
			country: client?.address?.country || "",
		},

		items: deliverables.length
			? deliverables.map((d) => ({
					name: d.name,
					description: d.description || "",
			  }))
			: [
					{
						name: milestoneName,
						description: "Milestone payment",
						qty: "1",
						price: `$${invoiceAmount.toFixed(2)}`,
						amount: `$${invoiceAmount.toFixed(2)}`,
					},
			  ],

		subTotal: `$${invoiceAmount.toFixed(2)}`,
		taxLabel: `Tax (${(taxRate * 100).toFixed(0)}%)`,
		taxAmount: `$${taxAmount.toFixed(2)}`,
		totalAmount: `$${totalAmount.toFixed(2)}`,

		// notes: "Thank you for your business!",
		// paymentInstructions: "Please send payment via e-Transfer to pay@clario.app",
		// logoUrl: "",
	};
	// const invoiceData = newInvoice.toObject();

	invoiceData.issueDate = new Date(invoiceData.issueDate).toLocaleDateString("en-CA");
	invoiceData.dueDate = new Date(invoiceData.dueDate).toLocaleDateString("en-CA");

	const pdfPath = await generateInvoicePDF(invoiceData);

	const pdfFile = {
		buffer: fs.readFileSync(pdfPath),
		mimetype: "application/pdf",
		originalname: `invoice_${newInvoice.invoiceNumber}.pdf`,
		size: fs.statSync(pdfPath).size,
	};

	const uploaded = await uploadToFirebase(pdfFile, "invoices");

	newInvoice.fileUrl = uploaded.fileUrl;
	await newInvoice.save();

	if (fs.existsSync(pdfPath)) fs.unlinkSync(pdfPath);
	return newInvoice;
};

export const getInvoicesService = async (userId, projectId) => {
	return await Invoice.find({ userId, projectId }).sort({ createdAt: -1 });
};

export const getInvoiceByIdService = async (invoiceId, userId) => {
	return await Invoice.findOne({ _id: invoiceId, userId });
};

export const updateInvoiceStatusService = async (invoiceId, userId, status) => {
	const updated = await Invoice.findOneAndUpdate({ _id: invoiceId, userId }, { status }, { new: true });

	if (status == "Paid") {
		await Transaction.create({
			userId,
			type: "income",
			projectId: updated.projectId,
			title: `Payment received for ${updated.milestoneName}`,
			baseAmount: updated.amount,
			taxAmount: updated.taxAmount,
			totalAmount: updated.totalAmount,
			date: new Date(),
			origin: "invoice",
		});
	}
	return updated;
};
