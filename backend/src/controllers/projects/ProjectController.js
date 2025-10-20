import {
	findAllProjects,
	findByProjectId,
	createNewProject,
	updateProjectById,
	archiveProjectById,
} from "../../services/projects/ProjectsService.js";
import { projectSchema } from "../../validations/projectSchema.js";

export const getAllProjects = async (req, res) => {
	try {
		const { sub: userId } = req.auth;
		const { page = 1, limit = 20 } = req.query;

		const result = await findAllProjects(userId, parseInt(page), parseInt(limit));

		res.status(200).json(result);
	} catch (err) {
		console.error("Error fetching projects: ", err);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const getProjectById = async (req, res) => {
	try {
		const { id: projectId } = req.params;
		const { sub: userId } = req.auth;

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
		const { sub: userId } = req.auth;
		const parsed = projectSchema.parse(req.body);
		const result = await createNewProject(parsed, userId);

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
		const { sub: userId } = req.auth;

		const parsed = projectSchema.partial().parse(req.body);
		const result = await updateProjectById(projectId, userId, parsed);

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
		const { sub: userId } = req.auth;
		const { isArchived } = req.body;

		const result = await archiveProjectById(projectId, userId, isArchived);

		if (!result) return res.status(404).json({ message: "Project not found." });

		res.status(200).json(result);
	} catch (err) {
		console.error("Error deleting project: ", err);
		res.status(500).json({
			message: "Internal Server Error",
		});
	}
};
