import fs from "fs";
import Invoice from "../../models/Invoice.js";
import Project from "../../models/Project.js";
import { generateEmail, generateInvoicePDF } from "../../utils/generateHTML.js";
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
	let milestoneAmount = 0;
	let deliverables = [];

	if (milestoneId) {
		const milestone = project.milestones.id(milestoneId);
		if (!milestone) throw new Error("Milestone not found");
		invoiceAmount = milestone.amount;
		milestoneName = milestone.name;
		milestoneAmount = milestone.amount;
		deliverables = milestone.deliverables.map((d) => ({ name: d.name, description: d.description || "" }));
	} else {
		if (project.upfrontAmount > 0) {
			invoiceAmount = project.upfrontAmount;
		} else {
			throw new Error("No milestone or upfront amount found");
		}
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
		milestoneAmount,
		dueDate,
		deliverables,
		amount: invoiceAmount,
		taxAmount,
		totalAmount,
	});

	const invoiceData = {
		logo: "https://firebasestorage.googleapis.com/v0/b/clario-6bfca.firebasestorage.app/o/public%2Flogo.png?alt=media&token=97a516bc-af35-4b0b-b163-7b709c778ae8",
		invoiceNumber: newInvoice.invoiceNumber,
		issueDate: new Date(newInvoice.createdAt).toLocaleDateString("en-CA"),
		dueDate: newInvoice.dueDate.toLocaleDateString("en-CA"),

		billFrom: {
			name: name || "",
			email: email || "",
			phone: phone || "",
			// addressLine1: address?.street || "",
			// addressLine2: `${address?.city || ""}, ${address?.postalCode || ""}`,
			country: address?.country || "Canada",
			// taxId: `Tax (${province})`,
		},

		billTo: {
			clientName: client?.name || "Client",
			email: client?.email || "",
			phone: client?.phone || "",
			addressLine1: client?.address?.street || "",
			addressLine2: `${client?.address?.city || ""}, ${client?.address?.postalCode || ""}`,
			country: client?.address?.country || "",
		},

		milestoneName,
		milestoneAmount,
		deliverables: deliverables.length
			? deliverables.map((d) => ({
					name: d.name,
				}))
			: [
					{
						name: milestoneName,
					},
				],

		subTotal: `$${invoiceAmount.toFixed(2)}`,
		taxAmount: `$${taxAmount.toFixed(2)}`,
		totalAmount: `$${totalAmount.toFixed(2)}`,
	};
	console.log(invoiceData);

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

export const getInvoicesService = async (userId, projectId, page = 1, limit = 10) => {
	const query = { userId };
	if (projectId) query.projectId = projectId;

	const total = await Invoice.countDocuments(query);
	const data = await Invoice.find(query)
		.sort({ createdAt: -1 })
		.skip((page - 1) * limit)
		.limit(Number(limit));

	return {
		data,
		meta: {
			total,
			page: Number(page),
			limit: Number(limit),
			totalPages: Math.ceil(total / limit),
		},
	};
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

export const sendInvoiceService = async (invoiceId, user) => {
	const invoice = await Invoice.findOne({ _id: invoiceId, userId: user.id }).populate("clientId");
	if (!invoice) throw new Error("Invoice not found");

	const project = await Project.findById(invoice.projectId);
	if (!project) throw new Error("Project not found");

	const client = await Client.findById(project.clientId);
	if (!client) throw new Error("Client not found");

	await generateEmail({ invoice, client, project, user });

	invoice.sentAt = new Date();
	await invoice.save();

	return {
		message: `Invoice #${invoice.invoiceNumber} sent to ${client.email}`,
		sentAt: invoice.sentAt,
	};
};
