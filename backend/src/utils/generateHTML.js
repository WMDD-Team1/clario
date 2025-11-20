import fs from "fs";
import path from "path";
import Handlebars from "handlebars";
import puppeteer from "puppeteer";
import { Resend } from "resend";
import axios from "axios";
import sgMail from "@sendgrid/mail";

const __dirname = import.meta.dirname;

export const generateInvoicePDF = async (invoice) => {
	const templatePATH = path.join(__dirname, "../assets/templates/invoice-template.html");
	const templateHTML = fs.readFileSync(templatePATH, "utf8");

	const template = Handlebars.compile(templateHTML);
	const html = template(invoice);

	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();
	await page.setContent(html, { waitUntil: "networkidle0" });

	const outputDir = path.resolve("tmp/invoices");
	if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

	const pdfPath = `${outputDir}/invoice_${invoice.invoiceNumber}.pdf`;

	await page.pdf({
		path: pdfPath,
		format: "A4",
		printBackground: true,
		margin: { top: "30px", bottom: "30px" },
	});

	await browser.close();

	return pdfPath;
};

export const generateContractPDF = async (data) => {
	const templatePATH = path.join(__dirname, "../assets/templates/contract-template.html");
	if (!fs.existsSync(templatePATH)) throw new Error("Contract template not found");

	const templateHTML = fs.readFileSync(templatePATH, "utf8");
	const template = Handlebars.compile(templateHTML);
	const html = template(data);

	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();
	await page.setContent(html, { waitUntil: "networkidle0" });

	const outputDir = path.resolve("tmp/contracts");
	if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

	const fileName = `${data.projectName?.replace(/\s+/g, "_") || "contract"}_draft.pdf`;
	const pdfPath = `${outputDir}/${fileName}`;

	await page.pdf({
		path: pdfPath,
		format: "A4",
		printBackground: true,
		margin: { top: "30px", bottom: "30px" },
	});

	await browser.close();

	return pdfPath;
};

export const generateEmail = async ({ invoice, client, project, user }) => {
	const templatePATH = path.join(__dirname, "../assets/templates/email-template.html");
	if (!fs.existsSync(templatePATH)) throw new Error("Email template not found");

	const htmlTemplate = fs.readFileSync(templatePATH, "utf8");
	const compile = Handlebars.compile(htmlTemplate);
	const html = compile({
		client_name: client.name,
		project_name: project.name,
		due_date: new Date(invoice.dueDate).toLocaleDateString("en-CA"),
		your_name: user.name,
	});

	if (!invoice.fileUrl) {
		throw new Error("Invoice PDF is not generated yet.");
	}

	const response = await axios.get(invoice.fileUrl, { responseType: "arraybuffer" });

	const base64File = Buffer.from(response.data).toString("base64");
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);

	const msg = {
		to: client.email,
		from: process.env.SENDGRID_SENDER_EMAIL,
		reply_to: user.email,
		subject: `Invoice #${invoice.invoiceNumber} for ${project.name}`,
		html,
		attachments: [
			{
				content: base64File,
				filename: `invoice_${invoice.invoiceNumber}.pdf`,
				type: "application/pdf",
				disposition: "attachment",
			},
		],
	};
	console.log("=====", msg);

	await sgMail.send(msg);

	return { success: true, to: client.email };
};
