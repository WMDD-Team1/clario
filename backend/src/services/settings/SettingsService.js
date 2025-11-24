import User from "../../models/User.js";
import Transaction from "../../models/Transaction.js";
import { Parser } from "json2csv";
import bcrypt from "bcrypt";

export const updateUserProfile = async (user, updates) => {
	if (!user) throw new Error("User not found");

	if (updates.name) user.name = updates.name;
	if (updates.email) user.email = updates.email;
	if (updates.picture) user.picture = updates.picture;

	if (updates.address && typeof updates.address === "object") {
		user.address = {
			street: updates.address.street ?? user.address?.street ?? null,
			city: updates.address.city ?? user.address?.city ?? null,
			postalCode: updates.address.postalCode ?? user.address?.postalCode ?? null,
			country: updates.address.country ?? user.address?.country ?? null,
		};
	}

	await user.save();
	return user;
};

export const updateUserPreferences = async (userId, updates) => {
	const user = await User.findById(userId);
	if (!user) throw new Error("User not found");

	if (updates.language) user.settings.general.language = updates.language;
	if (updates.theme) user.settings.general.theme = updates.theme;

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

	console.log(categories);
	user.settings.finance.expenseCategories = categories;
	await user.save();

	return user.settings.finance.expenseCategories;
};

export const exportTransactionsCSV = async (userId) => {
	const records = await Transaction.find({ userId }).lean();
	if (!records.length) return null;

	const fields = [
		{ label: "Title", value: "title" },
		{ label: "Type", value: "type" },
		{ label: "Category", value: (r) => r.category || "N/A" },
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

export const updateUserPasswordService = async (email, updates) => {
	const user = await User.findOne({ email });
	if (!user) throw new Error("User not found");

	const hashed = await bcrypt.hash(updates.password, 10);
	user.password = hashed;

	await user.save();
	return { success: true };
};

export const verifyPassword = async (email, currentPassword) => {
	const user = await User.findOne({ email });
	if (!user) return false;

	if (!user.password || user.password === "google_oauth") return false;

	return bcrypt.compare(currentPassword, user.password);
};
