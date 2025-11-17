import {
	findAllProjects,
	findByProjectId,
	createNewProject,
	updateProjectById,
	archiveProjectById,
	getOverviewService,
} from "../../services/projects/ProjectService.js";
import { projectSchema } from "../../validations/projectSchema.js";

export const getAllProjects = async (req, res) => {
	try {
		const { id: userId } = req.user;
		const result = await findAllProjects(userId, req.query);

		res.status(200).json(result);
	} catch (err) {
		console.error("Error fetching projects: ", err);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const getProjectById = async (req, res) => {
	try {
		const { id: projectId } = req.params;
		const { id: userId } = req.user;

		const result = await findByProjectId(projectId, userId);

		if (!result) return res.status(404).json({ message: "Project not found" });

		res.status(200).json(result);
	} catch (err) {
		console.error("Error fetching project: ", err);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const createProject = async (req, res) => {
	try {
		const { id: userId } = req.user;
		const body = req.body;
		const data = {
			...body,
			upfrontAmount: body.upfrontAmount ? Number(body.upfrontAmount) : 0,
		};
		const parsed = projectSchema.parse(data);
		const file = req.file;
		const result = await createNewProject(parsed, file, userId);

		res.status(201).json(result);
	} catch (err) {
		console.error("Error creating project: ", err);
		res.status(400).json({
			message: "Invalid data",
			error: err.message,
		});
	}
};

export const updateProject = async (req, res) => {
	try {
		const { id: projectId } = req.params;
		const { id: userId } = req.user;

		const result = await updateProjectById(projectId, userId, req.body);

		if (!result) return res.status(404).json({ message: "Project not found." });

		res.status(200).json(result);
	} catch (err) {
		console.error("Error updating project: ", err);
		res.status(500).json({
			message: "Internal Server Error",
		});
	}
};

export const archiveProject = async (req, res) => {
	try {
		const { id: projectId } = req.params;
		const { id: userId } = req.user;
		const { isArchived } = req.body;

		const result = await archiveProjectById(projectId, userId, isArchived);

		if (!result) return res.status(404).json({ message: "Project not found." });

		res.status(200).json({
			message: `Project ${isArchived ? "archived" : "unarchived"} successfully.`,
			project: result,
		});
	} catch (err) {
		console.error("Error deleting project: ", err);
		res.status(500).json({
			message: "Internal Server Error",
		});
	}
};

export const getOverview = async (req, res) => {
	try {
		const { id: userId } = req.user;
		const result = await getOverviewService(userId);
		res.status(200).json(result);
	} catch (err) {
		console.error("Error fetching project overview: ", err);
		res.status(500).json({ message: "Internal Server Error" });
	}
};
