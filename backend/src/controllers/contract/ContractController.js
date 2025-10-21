import { uploadContractService } from "../../services/contract/ContractService.js";

export const uploadContract = async (req, res) => {
	try {
		const { id: userId } = req.user;
		let { clientId, projectId } = req.body;

		const file = req.file;

		if (!projectId || projectId === "null" || projectId === "") projectId = null;
		if (!clientId || clientId === "null" || clientId === "") clientId = null;

		const { projectInput } = await uploadContractService(file, userId, clientId, projectId);

		if (projectId) {
			return res.status(201).json({
				message: "Contract uploaded and linked to project successfully.",
			});
		}

		return res.status(201).json({
			message: "Contract uploaded and parsed successfully.",
			projectInput,
		});
	} catch (err) {
		console.error("Error uploading contract:", err);
		res.status(500).json({ message: "Internal Server Error" });
	}
};
