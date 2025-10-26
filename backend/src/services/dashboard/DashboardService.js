import Project from "../../models/Project.js";

export const getUpcomingReminders = async (userId, daysAhead = 7, page = 1, limit = 10) => {
	const now = new Date();
	const future = new Date();
	future.setDate(now.getDate() + daysAhead);

	const projects = await Project.find({ userId })
		.populate("clientId", "name")
		.select("name milestones clientId")
		.lean();

	const allReminders = projects.flatMap((project) =>
		(project.milestones || [])
			.filter((m) => {
				const due = new Date(m.dueDate);
				return m.dueDate && due >= now && due <= future;
			})
			.map((m) => ({
				projectId: project._id,
				milestoneId: m._id,
				milestoneName: m.name,
				clientName: project.clientId?.name || "Unknown",
				dueDate: m.dueDate,
			}))
	);

	allReminders.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

	const total = allReminders.length;
	const totalPages = Math.ceil(total / limit);
	const startIndex = (page - 1) * limit;
	const paginatedReminders = allReminders.slice(startIndex, startIndex + limit);

	return {
		data: paginatedReminders,
		meta: {
			total,
			page,
			limit,
			totalPages,
			hasNextPage: page < totalPages,
		},
	};
};
