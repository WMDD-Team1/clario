import User from "../../models/User.js";
import {
	updateUserProfile,
	updateUserPreferences,
	updateUserFinanceSettings,
	getUserSettings,
	getIncomeCategoriesService,
	updateIncomeCategoriesService,
	getExpenseCategoriesService,
	updateExpenseCategoriesService,
	exportTransactionsCSV,
} from "../../services/settings/SettingsService.js";

export const updateProfile = async (req, res) => {
	try {
		const { id: userId } = req.user;
		const data = await updateUserProfile(userId, req.body);

		res.status(200).json({
			message: "Profile updated successfully",
			data,
		});
	} catch (err) {
		console.error("Error updating profile:", err);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const updatePreferences = async (req, res) => {
	try {
		const { id: userId } = req.user;
		const data = await updateUserPreferences(userId, req.body);

		res.status(200).json({
			message: "Preferences updated successfully",
			data,
		});
	} catch (err) {
		console.error("Error updating preferences:", err);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const updateFinanceSettings = async (req, res) => {
	try {
		const { id: userId } = req.user;
		const updated = await updateUserFinanceSettings(userId, req.body);

		res.status(200).json({
			message: "Finance settings updated successfully",
			data: updated,
		});
	} catch (err) {
		console.error("Error updating finance settings:", err);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const getSettings = async (req, res) => {
	try {
		const { id: userId } = req.user;
		const settings = await getUserSettings(userId);

		res.status(200).json({
			message: "Settings fetched successfully",
			data: settings,
		});
	} catch (err) {
		console.error("Error fetching user settings:", err);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const getIncomeCategories = async (req, res) => {
	try {
		const { id: userId } = req.user;
		const data = await getIncomeCategoriesService(userId);
		res.status(200).json({ categories: data });
	} catch (err) {
		console.error("Error fetching income categories:", err);
		res.status(500).json({ message: err.message || "Internal Server Error" });
	}
};
export const updateIncomeCategories = async (req, res) => {
	try {
		const { id: userId } = req.user;
		const { categories } = req.body;
		const data = await updateIncomeCategoriesService(userId, categories);
		res.status(200).json({ message: "Income categories updated", categories: data });
	} catch (err) {
		console.error("Error updating income categories:", err);
		res.status(500).json({ message: err.message || "Internal Server Error" });
	}
};
export const getExpenseCategories = async (req, res) => {
	try {
		const { id: userId } = req.user;
		const data = await getExpenseCategoriesService(userId);
		res.status(200).json({ categories: data });
	} catch (err) {
		console.error("Error fetching expense categories:", err);
		res.status(500).json({ message: err.message || "Internal Server Error" });
	}
};
export const updateExpenseCategories = async (req, res) => {
	try {
		const { id: userId } = req.user;
		const { categories } = req.body;
		const data = await updateExpenseCategoriesService(userId, categories);
		res.status(200).json({ message: "Expense categories updated", categories: data });
	} catch (err) {
		console.error("Error updating expense categories:", err);
		res.status(500).json({ message: err.message || "Internal Server Error" });
	}
};

export const exportCSV = async (req, res) => {
	try {
		const { id: userId } = req.user;
		const csvBuffer = await exportTransactionsCSV(userId);

		res.setHeader("Content-Type", "text/csv");
		res.setHeader("Content-Disposition", "attachment; filename=transactions.csv");

		res.status(200).send(csvBuffer);
	} catch (err) {
		console.error("Error exporting transactions:", err);
		res.status(500).json({ message: "Failed to export transactions" });
	}
};
