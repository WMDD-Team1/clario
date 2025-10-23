import Contract from "../../models/Contract.js";
import { analyzeContractService, uploadContractService } from "../../services/contract/ContractService.js";

export const uploadContract = async (req, res) => {
	try {
		const { id: userId } = req.user;
		let { clientId, projectId } = req.body;

		const file = req.file;

		if (!projectId || projectId === "null" || projectId === "") projectId = null;
		if (!clientId || clientId === "null" || clientId === "") clientId = null;

		const { projectInput } = await uploadContractService(file, userId, clientId, projectId);

		return res.status(201).json({
			message: "Contract uploaded and parsed successfully.",
			projectInput,
		});
	} catch (err) {
		console.error("Error uploading contract:", err);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const analyzeContract = async (req, res) => {
	try {
		const { id: userId } = req.user;
		const { projectId } = req.body;

		if (!projectId) {
			return res.status(400).json({ message: "ProjectId is required" });
		}

		const contract = await Contract.findOne({ userId, projectId });

		if (!contract) {
			return res.status(404).json({ message: "No contract " });
		}

		const result = await analyzeContractService(contract);
		res.status(200).json({
			message: "Contract analyzed successfully",
			result,
		});
	} catch (err) {
		console.error("Error analyzing contract:", err);
		res.status(500).json({ message: err.message || "Internal Server Error" });
	}
};
