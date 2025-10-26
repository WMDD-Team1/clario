import User from "../../models/User.js";

export const getCategoriesByUser = async (userId) => {
	const user = await User.findById(userId).select("settings.finance.categories");

	if (!user) throw new Error("User not found");

	const categories = user.settings.finance.categories || [];
	return {
		income: categories.filter((c) => c.type === "income"),
		expense: categories.filter((c) => c.type === "expense"),
	};
};

export const createCategory = async (userId, data) => {
	const user = await User.findById(userId);
	if (!user) throw new Error("User not found");

	const newCategory = {
		name: data.name,
		type: data.type?.toLowerCase() || "expense",
	};

	user.settings.finance.categories.push(newCategory);
	await user.save();

	// return the newly added category
	return user.settings.finance.categories.at(-1);
};
export const updateCategory = async (userId, categoryId, data) => {
	const user = await User.findById(userId);
	if (!user) throw new Error("User not found");

	const category = user.settings.finance.categories.id(categoryId);
	if (!category) throw new Error("Category not found");

	category.name = data.name ?? category.name;
	category.type = data.type?.toLowerCase() ?? category.type;

	await user.save();
	return category;
};

export const deleteCategory = async (userId, categoryId) => {
	const user = await User.findById(userId);
	if (!user) throw new Error("User not found");

	const category = user.settings.finance.categories.id(categoryId);
	if (!category) throw new Error("Category not found");

	category.deleteOne();
	await user.save();

	return { message: "Category deleted successfully" };
};
