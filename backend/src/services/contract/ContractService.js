import { uploadToFirebase } from "../../utils/uploadFile.js";
import { extractPdfText, extractImageText, extractContractFields } from "../../utils/parser.js";
import Contract from "../../models/Contract.js";
import Project from "../../models/Project.js";

export const uploadContractService = async (file, userId, clientId, projectId) => {
	if (!file) throw new Error("No file uploaded");

	// upload on firebase storage
	const { fileName, fileUrl, fileType, size } = await uploadToFirebase(file);
	let projectInput = {};
	let parsedText = [];

	if (!projectId) {
		// parsing
		if (fileType === "pdf") {
			try {
				parsedText = await extractPdfText(fileUrl);
			} catch (err) {
				console.error("PDF parsing error:", err);
				parsedText = [];
			}
		} else if (["png", "jpeg", "jpg"].includes(fileType)) {
			try {
				parsedText = await extractImageText(fileUrl);
			} catch (err) {
				console.error("Image OCR error:", err);
				parsedText = [];
			}
		}

		// sending parsed text to openAI
		const fullText = parsedText.map((p) => p.content).join(" ");
		if (fullText.trim().length > 50) {
			try {
				projectInput = await extractContractFields(fullText);
			} catch (err) {
				console.error("AI field extraction error:", err);
			}
		}
	}

	// if needed later
	const contract = await Contract.create({
		userId,
		clientId,
		projectId,
		fileName,
		fileUrl,
		fileType,
		size,
		status: projectId ? "uploaded" : "parsed",
		parsedText,
	});

	if (projectId) {
		await Project.findByIdAndUpdate(projectId, { active: true });
	}

	return { projectInput };
};
