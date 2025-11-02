import fs from "fs";
import path from "path";
import Handlebars from "handlebars";
import puppeteer from "puppeteer";
import { Resend } from "resend";
import axios from "axios";

if (!process.env.RESEND_API_KEY) {
	throw new Error("Missing RESEND_API_KEY in environment variables");
}

const resend = new Resend(process.env.RESEND_API_KEY);

const __dirname = import.meta.dirname;

export const generateInvoicePDF = async (invoice) => {
	const templatePATH = path.join(__dirname, "../public/templates/invoice-template.html");
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
	const templatePATH = path.join(__dirname, "../public/templates/contract-template.html");
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
	const templatePATH = path.join(__dirname, "../public/templates/email-template.html");
	if (!fs.existsSync(templatePATH)) throw new Error("Email template not found");

	const htmlTemplate = fs.readFileSync(templatePATH, "utf8");
	const compile = Handlebars.compile(htmlTemplate);
	const html = compile({
		client_name: client.name,
		project_name: project.name,
		due_date: new Date(invoice.dueDate).toLocaleDateString("en-CA"),
		your_name: user.name,
	});

	const response = await axios.get(invoice.fileUrl, { responseType: "arraybuffer" });
	const base64File = Buffer.from(response.data).toString("base64");

	await resend.emails.send({
		from: "Clario Invoices <onboarding@resend.dev>",
		to: client.email,
		reply_to: user.email,
		subject: `Invoice #${invoice.invoiceNumber} for ${project.name}`,
		html,
		attachments: [
			{
				filename: `invoice_${invoice.invoiceNumber}.pdf`,
				content: base64File,
			},
		],
	});
	return { success: true, to: client.email };
};
