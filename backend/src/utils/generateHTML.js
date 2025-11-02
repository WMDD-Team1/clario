import fs from "fs";
import path from "path";
import Handlebars from "handlebars";
import puppeteer from "puppeteer";

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
	console.log(templatePATH);
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
