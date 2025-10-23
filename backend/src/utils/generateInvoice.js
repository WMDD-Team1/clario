import fs from "fs";
import path from "path";
import Handlebars from "handlebars";
import puppeteer from "puppeteer";

export const generateInvoicePDF = async (invoice) => {
	const templatePATH = path.resolve("public/templates/invoice-template.html");
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
