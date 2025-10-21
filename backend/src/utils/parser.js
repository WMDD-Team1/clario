import { PDFExtract } from "pdf.js-extract";
import Tesseract from "tesseract.js";
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const extractPdfText = async (fileUrl) => {
	const pdfExtract = new PDFExtract();
	const res = await fetch(fileUrl);
	const buffer = Buffer.from(await res.arrayBuffer());

	const data = await pdfExtract.extractBuffer(buffer);

	return data.pages.map((page, index) => ({
		page: index + 1,
		content: page.content.map((item) => item.str).join(" "),
	}));
};

export const extractImageText = async (fileUrl) => {
	const { data } = await Tesseract.recognize(fileUrl, "eng");
	return [
		{
			page: 1,
			content: data.text,
		},
	];
};
export const extractContractFields = async (text) => {
	const prompt = `
	You are a contract data extractor.
	Read the following contract text and return ONLY JSON for a new project input in this format:
	{
		"projectName": "...",
		"clientName": "...",
		"description": "...",
		"startDate": "YYYY-MM-DD",
		"dueDate": "YYYY-MM-DD",
		"totalBudget": 0
	}

	If a field is missing, set it to null.
	DO NOT include any explanation, commentary, or text outside the JSON.
	Respond with valid JSON only.

	Contract text:
	${text.slice(0, 7000)}
	`;

	const res = await openai.chat.completions.create({
		model: "gpt-4o-mini",
		messages: [{ role: "user", content: prompt }],
		temperature: 0.2,
	});

	try {
		const content = res.choices[0].message.content;
		const jsonStart = content.indexOf("{");
		const jsonEnd = content.lastIndexOf("}");
		const cleanJson = content.slice(jsonStart, jsonEnd + 1);
		return JSON.parse(cleanJson);
	} catch (err) {
		console.error("⚠️ JSON parse error from OpenAI:", err);
		console.log("Raw AI output:", res.choices[0].message.content);
		return {};
	}
};
