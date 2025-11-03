import Project from "../../models/Project.js";
import { uploadToFirebase, deleteFromFirebase } from "../../utils/fileHandler.js";

const MAX_FILES_PER_DELIVERABLE = 5;
const MAX_FILE_SIZE_MB = 5;
const ALLOWED_FILE_TYPES = ["pdf", "png", "jpeg", "jpg"];

export const getDeliverableByIdService = async (projectId, milestoneId, deliverableId, userId) => {
	const project = await Project.findOne({ _id: projectId, userId });
	if (!project) throw new Error("Project not found");

	const milestone = project.milestones.id(milestoneId);
	if (!milestone) throw new Error("Milestone not found");

	const deliverable = milestone.deliverables.id(deliverableId);
	if (!deliverable) throw new Error("Deliverable not found");

	return {
		...deliverable.toJSON(),
		files:
			deliverable.files?.map((f) => ({
				id: f._id,
				fileUrl: f.fileUrl,
				fileType: f.fileType,
				size: f.size,
				uploadedAt: f.uploadedAt,
			})) || [],
	};
};
export const addDeliverableService = async (projectId, milestoneId, userId, data, file) => {
	const project = await Project.findOne({ _id: projectId, userId });
	if (!project) throw new Error("Project not found");

	const milestone = project.milestones.id(milestoneId);
	if (!milestone) throw new Error("Milestone not found");

	if (milestone.deliverables.length >= MAX_FILES_PER_DELIVERABLE) {
		throw new Error("Cannot have more than 5 deliverables per milestone.");
	}

	let fileInfo = null;
	if (file) {
		const fileSizeMB = file.size / (1024 * 1024);
		if (fileSizeMB > MAX_FILE_SIZE_MB) {
			throw new Error("File size exceeds 5MB limit.");
		}

		const fileType = file.mimetype.split("/")[1];
		if (!ALLOWED_FILE_TYPES.includes(fileType)) {
			throw new Error("Invalid file type. Only pdf, png, jpeg, jpg allowed.");
		}

		const uploaded = await uploadToFirebase(file, "deliverables");
		fileInfo = {
			fileUrl: uploaded.fileUrl,
			fileType: fileType,
			size: file.size,
		};
	}

	const deliverableData = {
		...data,
		files: fileInfo ? [fileInfo] : [],
	};

	milestone.deliverables.push(deliverableData);
	await project.save();

	return milestone.deliverables.at(-1).toJSON();
};

export const updateDeliverableService = async (projectId, milestoneId, deliverableId, userId, data, file) => {
	const project = await Project.findOne({ _id: projectId, userId });
	if (!project) throw new Error("Project not found");

	const milestone = project.milestones.id(milestoneId);
	if (!milestone) throw new Error("Milestone not found");

	const deliverable = milestone.deliverables.id(deliverableId);
	if (!deliverable) throw new Error("Deliverable not found");

	// update text fields
	if (data.name) deliverable.name = data.name;
	if (data.description) deliverable.description = data.description;
	if (data.dueDate) deliverable.dueDate = data.dueDate;
	if (data.status) deliverable.status = data.status;

	if (file) {
		if (deliverable.files.length >= MAX_FILES_PER_DELIVERABLE) {
			throw new Error("Cannot upload more than 5 files per deliverable.");
		}

		const fileSizeMB = file.size / (1024 * 1024);
		const fileType = file.mimetype.split("/")[1];

		if (fileSizeMB > MAX_FILE_SIZE_MB) {
			throw new Error("File size exceeds 5MB limit.");
		}

		if (!ALLOWED_FILE_TYPES.includes(fileType)) {
			throw new Error("Invalid file type. Only pdf, png, jpeg, jpg allowed.");
		}

		if (deliverable.files?.length > 0) {
			for (const f of deliverable.files) {
				await deleteFromFirebase(f.fileUrl);
			}
			deliverable.files = [];
		}

		const uploaded = await uploadToFirebase(file, "deliverables");
		deliverable.files.push({
			fileUrl: uploaded.fileUrl,
			fileType,
			size: file.size,
		});
	}

	await project.save();
	return deliverable.toJSON();
};
export const deleteDeliverableService = async (projectId, milestoneId, deliverableId, userId, fileId) => {
	const project = await Project.findOne({ _id: projectId, userId });
	if (!project) throw new Error("Project not found");

	const milestone = project.milestones.id(milestoneId);
	if (!milestone) throw new Error("Milestone not found");

	const deliverable = milestone.deliverables.id(deliverableId);
	if (!deliverable) throw new Error("Deliverable not found");

	// delete single file
	if (fileId) {
		const file = deliverable.files.id(fileId);
		if (!file) throw new Error("File not found in this deliverable.");

		if (file.fileUrl) await deleteFromFirebase(file.fileUrl);
		file.deleteOne();
		await project.save();

		return { message: "File deleted successfully" };
	}

	// delete entire deliverable
	await Promise.all(
		deliverable.files.map(async (f) => {
			if (f.fileUrl) await deleteFromFirebase(f.fileUrl);
		})
	);

	deliverable.deleteOne();
	await project.save();

	return { message: "Deliverable deleted successfully" };
};
