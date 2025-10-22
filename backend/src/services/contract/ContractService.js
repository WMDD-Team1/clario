import { uploadToFirebase } from "../../utils/uploadFile.js";
import { extractPdfText, extractImageText, extractContractFields } from "../../utils/parser.js";
import Contract from "../../models/Contract.js";
import Project from "../../models/Project.js";
import { analyzeContractText } from "../../utils/analyze.js";

export const uploadContractService = async (file, userId, clientId, projectId) => {
	if (!file) throw new Error("No file uploaded");

	// upload on firebase storage
	const { fileName, fileUrl, fileType, size } = await uploadToFirebase(file, "contracts/original");

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
				console.log(projectInput);
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
		contractName: fileName,
		contractUrl: fileUrl,
		fileType,
		size,
		status: projectId ? "uploaded" : "parsed",
		parsedText,
	});

	if (projectId) {
		await Project.findByIdAndUpdate(projectId, { isActive: true });
	}

	console.log(projectInput);
	return { projectInput };
};

export const analyzeContractService = async (contract) => {
	const { contractUrl, fileType } = contract;
	let pages = [];

	if (fileType === "pdf") {
		pages = await extractPdfText(contractUrl);
	} else {
		pages = await extractImageText(contractUrl);
	}

	const fullText = pages.map((page) => page.content).join("\n\n");
	const risks = await analyzeContractText(fullText);

	contract.aiAnalysis = {
		riskyClauses: risks,
	};
	await contract.save();

	return {
		contractId: contract._id,
		contractName: contract.contractName,
		contractUrl: contract.contractUrl,
		aiAnalysis: contract.aiAnalysis,
	};
};
