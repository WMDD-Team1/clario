import axios from "axios";
import User from "../../models/User.js";
import { getManagementToken } from "../../utils/auth0.js";
import Transaction from "../../models/Transaction.js";
import { Parser } from "json2csv";

export const updateAuth0Profile = async (auth0Id, updates) => {
	const token = await getManagementToken();

	const allowedFields = ["name", "email", "picture"];
	const payload = {};

	allowedFields.forEach((key) => {
		if (updates[key]) payload[key] = updates[key];
	});

	await axios.patch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${auth0Id}`, payload, {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	});
	return payload;
};

export const updateUserProfile = async (userId, updates) => {
	const user = await User.findById(userId);
	if (!user) throw new Error("User not found");

	await updateAuth0Profile(user.auth0Id, updates);

	if (updates.name) user.name = updates.name;
	if (updates.email) user.email = updates.email;
	if (updates.picture) user.picture = updates.picture;

	await user.save();

	return user;
};

export const updateUserPreferences = async (userId, updates) => {
	const user = await User.findById(userId);
	if (!user) throw new Error("User not found");

	if (updates.language) user.settings.general.language = updates.language;
	if (updates.theme) user.settings.general.theme = updates.theme; // "light" | "dark"

	await user.save();
	return user;
};

export const updateUserFinanceSettings = async (userId, updates) => {
	const user = await User.findById(userId);
	if (!user) throw new Error("User not found");

	if (updates.province) user.settings.finance.province = updates.province;

	await user.save();
	return user.settings.finance;
};

export const getUserSettings = async (userId) => {
	const user = await User.findById(userId).select("name email picture settings").lean();

	if (!user) throw new Error("User not found");

	return {
		profile: {
			name: user.name,
			email: user.email,
			picture: user.picture,
		},
		settings: user.settings,
	};
};

// income categories
export const getIncomeCategoriesService = async (userId) => {
	const user = await User.findById(userId).select("settings.finance.incomeCategories");
	if (!user) throw new Error("User not found");
	return user.settings.finance.incomeCategories || [];
};
export const updateIncomeCategoriesService = async (userId, categories) => {
	if (!Array.isArray(categories)) throw new Error("Categories must be an array");

	const user = await User.findById(userId);
	if (!user) throw new Error("User not found");

	user.settings.finance.incomeCategories = categories;
	await user.save();

	return user.settings.finance.incomeCategories;
};

// expense categories
export const getExpenseCategoriesService = async (userId) => {
	const user = await User.findById(userId).select("settings.finance.expenseCategories");
	if (!user) throw new Error("User not found");
	return user.settings.finance.expenseCategories || [];
};

export const updateExpenseCategoriesService = async (userId, categories) => {
	if (!Array.isArray(categories)) throw new Error("Categories must be an array");

	const user = await User.findById(userId);
	if (!user) throw new Error("User not found");

	user.settings.finance.expenseCategories = categories;
	await user.save();

	return user.settings.finance.expenseCategories;
};

export const exportTransactionsCSV = async (userId) => {
	const records = await Transaction.find({ userId }).lean();
	if (!records.length) throw new Error("No data to export");

	const fields = [
		{ label: "Title", value: "title" },
		{ label: "Type", value: "type" },
		{ label: "Category", value: (r) => r.categoryId || "N/A" },
		{ label: "Amount (Total)", value: "totalAmount" },
		{ label: "Tax Amount", value: "taxAmount" },
		{ label: "Base Amount", value: "baseAmount" },
		{ label: "Date", value: (r) => new Date(r.date).toLocaleDateString("en-CA") },
		{ label: "Payment Method", value: "paymentMethod" },
		{ label: "Notes", value: "notes" },
		{ label: "Frequency", value: "frequency" },
	];

	const parser = new Parser({ fields });
	const csv = parser.parse(records);

	return csv;
};
