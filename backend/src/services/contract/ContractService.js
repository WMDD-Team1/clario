import { uploadToFirebase, deleteFromFirebase } from "../../utils/fileHandler.js";
import { extractPdfText, extractImageText, extractContractFields } from "../../utils/parser.js";
import Contract from "../../models/Contract.js";
import Project from "../../models/Project.js";
import { analyzeContractText } from "../../utils/analyze.js";
import Client from "../../models/Client.js";
import { generateContractPDF } from "../../utils/generateHTML.js";
import fs from "fs";

export const uploadContractService = async (file, userId, clientId, projectId) => {
	if (!file) throw new Error("No file uploaded");

	// upload on firebase storage
	const { fileName, fileUrl, fileType, size } = await uploadToFirebase(file, "contracts/original");

	let projectInput = {};
	let parsedText = [];

	// no proejct
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
				if (projectInput.clientName) {
					const client = await Client.findOne({
						userId,
						name: { $regex: new RegExp(`^${projectInput.clientName}$`, "i") },
					}).select("_id name");

					if (client) {
						projectInput.clientId = client._id.toString();
						projectInput.clientExist = true;
					} else {
						projectInput.clientExist = false;
					}
				}
			} catch (err) {
				console.error("AI field extraction error:", err);
			}
		}
	}
	// with project
	if (projectId) {
		let existingContract = await Contract.findOne({ userId, projectId });

		if (existingContract) {
			if (existingContract.contractUrl) {
				try {
					await deleteFromFirebase(existingContract.contractUrl);
				} catch (err) {
					console.warn("Failed to delete old contract file:", err.message);
				}
			}

			existingContract.contractUrl = fileUrl;
			existingContract.fileType = fileType;
			existingContract.size = size;
			existingContract.aiAnalysis = undefined;
			existingContract.contractName = fileName;
			existingContract.updatedAt = new Date();

			await existingContract.save();
			await Project.findByIdAndUpdate(projectId, { isActive: true });
			return { message: "Contract replaced successfully" };
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
		parsedText,
	});

	if (projectId) {
		await Project.findByIdAndUpdate(projectId, { isActive: true });
	}

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

export const generateContractService = async (userId, projectId) => {
	const project = await Project.findById(projectId).populate("clientId", "name email address phone").lean();
	if (!project) throw new Error("Project not found");

	const today = new Date().toLocaleDateString("en-CA");
	const { milestones = [], upfrontAmount = 0 } = project;

	const data = {
		userType: project.type || "Contractor",
		clientName: project.clientId?.name || "Client Name",
		clientAddress: project.clientId?.address || "Client Address",
		clientEmail: project.clientId?.email || "client@email.com",
		clientPhone: project.clientId?.phone || "N/A",
		userName: project.userName || "Freelancer",
		userEmail: project.userEmail || "user@email.com",
		userAddress: project.userAddress || "User Address",
		userProvince: project.userProvince || "British Columbia",
		projectName: project.name || "Untitled Project",
		milestoneName: project.milestones?.[0]?.name || "",
		deliverableName: project.milestones?.[0]?.deliverables?.[0]?.name || "",
		totalAmount: project.totalBudget?.toLocaleString() || "0",
		upfront: project.upfrontAmount ? ((project.upfrontAmount / project.totalBudget) * 100).toFixed(0) : "0",
		startDate: project.startDate ? new Date(project.startDate).toLocaleDateString("en-CA") : "Start Date",
		endDate: project.dueDate ? new Date(project.dueDate).toLocaleDateString("en-CA") : "End Date",
		today,
	};

	const pdfPath = await generateContractPDF(data);

	const pdfBuffer = fs.readFileSync(pdfPath);
	const stats = fs.statSync(pdfPath);

	const safeName = project.name.replace(/\s+/g, "_");
	const fileName = `${safeName}-draft-contract.pdf`;

	const displayName = `${project.name} (Draft Contract)`;

	const pdfFile = {
		buffer: pdfBuffer,
		mimetype: "application/pdf",
		originalname: fileName,
		size: stats.size,
	};

	const uploaded = await uploadToFirebase(pdfFile, "contracts/drafts");

	const newContract = await Contract.create({
		userId,
		projectId,
		clientId: project.clientId?._id,
		contractName: fileName,
		contractUrl: uploaded.fileUrl,
		fileType: pdfFile.mimetype.split("/")[1],
		size: pdfFile.size,
		displayName,
		upfrontAmount,
		milestones,
	});

	fs.unlinkSync(pdfPath);

	return newContract;
};
