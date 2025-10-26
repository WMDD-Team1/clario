import { getUpcomingReminders } from "../../services/dashboard/DashboardService.js";
export const getReminders = async (req, res) => {
	try {
		const { id: userId } = req.user;
		const { days = 7, page = 1, limit = 10 } = req.query;

		const result = await getUpcomingReminders(userId, Number(days), Number(page), Number(limit));

		res.status(200).json(result);
	} catch (err) {
		console.error("Error fetching reminders:", err);
		res.status(500).json({ message: err.message });
	}
};
