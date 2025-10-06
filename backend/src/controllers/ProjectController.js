import Project from "../models/Project.js";
import {
	findAllProjects,
	findByPorjectId,
	createNewProject,
	updateProjectById,
	deleteProjectById,
	archiveProjectById,
} from "../services/projects/ProjectService.js";

export const getAllProjects = async (req, res) => {
	try {
		const { sub: userId } = req.auth;
		const { page = 1, limit = 20 } = req.query;

		const { projects, total, totalPages } = await findAllProjects(userId, parseInt(page), parseInt(limit));

		res.status(200).json({
			data: projects,
			meta: {
				total,
				page: parseInt(page),
				limit: parseInt(limit),
				length: projects.length,
				totalPages,
			},
		});
	} catch (err) {
		console.error("Error fetching projects: ", err);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const getProjectById = async (req, res) => {
	try {
		const projectId = req.params.id;
		const { sub: userId } = req.auth;

		const project = await findByPorjectId(projectId, userId);

		if (!project) return res.status(404).json({ message: "Project not found" });

		res.status(200).json(project);
	} catch (err) {
		console.error("Error fetching project: ", err);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const createProject = async (req, res) => {
	try {
		const { sub: userId } = req.auth;
		const project = await createNewProject(req.body, userId);
		res.status(201).json(project);
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
		const projectId = req.params.id;
		const { sub: userId } = req.auth;
		const project = await updateProjectById(projectId, userId, req.body);

		if (!project) return res.status(404).json({ message: "Project not found." });

		res.status(200).json(project);
	} catch (err) {
		console.error("Error updating project: ", err);
		res.status(500).json({
			message: "Internal Server Error",
		});
	}
};

export const deleteProject = async (req, res) => {
	try {
		const projectId = req.params.id;
		const { sub: userId } = req.auth;
		const project = await deleteProjectById(projectId, userId);

		if (!project) return res.status(404).json({ message: "Project not found." });

		res.status(200).json({ message: "Project deleted successfully." });
	} catch (err) {
		console.error("Error deleting project: ", err);
		res.status(500).json({
			message: "Internal Server Error",
		});
	}
};

export const toggleArchive = async (req, res) => {
	try {
		const projectId = req.params.id;
		const { sub: userId } = req.auth;
		const { isArchived } = req.body;

		const project = await archiveProjectById(projectId, userId, isArchived);

		if (!project) return res.status(404).json({ message: "Project not found." });

		res.status(200).json(project);
	} catch (err) {
		console.error("Error deleting project: ", err);
		res.status(500).json({
			message: "Internal Server Error",
		});
	}
};
