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

	const { fileName, fileUrl, fileType, size } = await uploadToFirebase(file, "contracts/original");

	let projectInput = {};
	let parsedText = [];

	//  no project
	if (!projectId) {
		// PDF or image parsing
		try {
			if (fileType === "pdf") parsedText = await extractPdfText(fileUrl);
			else if (["png", "jpeg", "jpg"].includes(fileType)) parsedText = await extractImageText(fileUrl);
		} catch (err) {
			console.error("Parsing error:", err);
			parsedText = [];
		}

		// send parsed text to AI
		const fullText = parsedText.map((p) => p.content).join(" ");
		if (fullText.trim().length > 50) {
			try {
				projectInput = await extractContractFields(fullText);

				//  match by clientName first
				if (projectInput.clientName) {
					const normalizeName = (name) => name.replace(/\b(inc|inc\.|ltd|co|company|corp|corporation)\b/gi, "").trim();
					const normalizedName = normalizeName(projectInput.clientName);

					let client = await Client.findOne({
						userId,
						name: { $regex: new RegExp(normalizedName, "i") },
					}).select("_id name");

					//  if not found by name, try by clientId
					if (!client && clientId) {
						client = await Client.findOne({ _id: clientId, userId }).select("_id name");
					}

					if (client) {
						projectInput.clientId = client._id.toString();
						projectInput.clientName = client.name;
						projectInput.clientExist = true;
					} else {
						projectInput.clientExist = false;
					}
				}

				//  no clientName from AI but clientId provided
				else if (clientId) {
					const client = await Client.findOne({ _id: clientId, userId }).select("_id name");
					if (client) {
						projectInput.clientId = client._id.toString();
						projectInput.clientName = client.name;
						projectInput.clientExist = true;
					} else {
						projectInput.clientExist = false;
					}
				} else {
					projectInput.clientExist = false;
				}
			} catch (err) {
				console.error("AI field extraction error:", err);
			}
		}

		return { projectInput };
	}

	// with project (replace or new upload)
	let existingContract = await Contract.findOne({ userId, projectId });

	if (existingContract) {
		if (existingContract.contractUrl) {
			try {
				await deleteFromFirebase(existingContract.contractUrl);
			} catch (err) {
				console.warn("Failed to delete old contract file:", err.message);
			}
		}

		Object.assign(existingContract, {
			contractUrl: fileUrl,
			fileType,
			size,
			contractName: fileName,
			aiAnalysis: undefined,
			parsedText,
			updatedAt: new Date(),
		});

		await existingContract.save();
		await Project.findByIdAndUpdate(projectId, { isActive: true });
		return existingContract.toJSON();
	}

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

	await Project.findByIdAndUpdate(projectId, { isActive: true });

	return contract.toJSON();
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

export const generateContractService = async (user, projectId) => {
	const project = await Project.findById(projectId).populate("clientId", "name email address phone").lean();
	if (!project) throw new Error("Project not found");

	const client = await Client.findById(project.clientId);

	const { id: userId } = user;
	const today = new Date().toLocaleDateString("en-CA");
	const { milestones = [], upfrontAmount = 0 } = project;

	const data = {
		userType: project.type || "Contractor",
		clientName: client?.name || "Client Name",
		clientAddress:
			`${client?.address?.street}, ${client?.address?.city}, ${client?.address?.postalCode}, ${client?.address?.country}` ||
			"Client Address",
		clientEmail: project.clientId?.email || "client@email.com",
		clientPhone: project.clientId?.phone || "N/A",
		userName: user?.name || "Freelancer",
		userEmail: user?.email || "user@email.com",
		userAddress:
			`${user?.address?.street}, ${user?.address?.city}, ${user?.address?.postalCode}, ${user?.address?.country}` ||
			"User Address",
		userProvince: user?.settings?.general?.province || "British Columbia",
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

	let contract = await Contract.findOne({ projectId, userId });
	if (contract) {
		Object.assign(contract, {
			contractName: fileName,
			contractUrl: uploaded.fileUrl,
			fileType: pdfFile.mimetype.split("/")[1],
			size: pdfFile.size,
			displayName,
			upfrontAmount,
			milestones,
			updatedAt: new Date(),
		});
		await contract.save();
	} else {
		contract = await Contract.create({
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
			createdAt: new Date(),
		});
	}
	await Project.findByIdAndUpdate(projectId);
	fs.unlinkSync(pdfPath);

	return contract;
};
