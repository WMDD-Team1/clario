import * as DashboardService from "../../services/dashboard/DashboardService.js";
export const getReminders = async (req, res) => {
	try {
		const { id: userId } = req.user;
		const { days = 7, page = 1, limit = 10 } = req.query;

		const result = await DashboardService.getUpcomingReminders(userId, Number(days), Number(page), Number(limit));
		res.status(200).json(result);
	} catch (err) {
		console.error("Error fetching reminders:", err);
		res.status(500).json({ message: err.message });
	}
};

export const getOverview = async (req, res) => {
	try {
		const { id: userId } = req.user;
		const overview = await DashboardService.getDashboardOverview(userId);
		res.status(200).json(overview);
	} catch (err) {
		console.error("Error fetching overview:", err);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const getCurrentMonthIncome = async (req, res) => {
	try {
		const { id: userId } = req.user;
		const result = await DashboardService.getCurrentMonthIncome(userId);
		res.status(200).json(result);
	} catch (err) {
		console.error("Error fetching current month stats:", err);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const getTopExpenses = async (req, res) => {
	try {
		const { id: userId } = req.user;
		const result = await DashboardService.getTopExpenses(userId);

		res.status(200).json(result);
	} catch (err) {
		console.error("Error fetching top expenses:", err);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const getMoneyFlow = async (req, res) => {
	try {
		const { id: userId } = req.user;
		const result = await DashboardService.getMoneyFlow(userId);

		res.status(200).json(result);
	} catch (err) {
		console.error("Error fetching money flow:", err);
		res.status(500).json({ message: "Internal Server Error" });
	}
};
