import Category from "../../models/Category.js";

export const getCategoriesByUser = async (userId) => {
	const categories = await Category.find({ userId });
	console.log(categories);
	return {
		income: categories.filter((c) => c.type === "Income"),
		expense: categories.filter((c) => c.type === "Expense"),
	};
};

export const createCategory = async (userId, data) => {
	const category = new Category({
		userId,
		name: data.name,
		type: data.type || "expense",
	});
	await category.save();
	return category;
};
export const updateCategory = async (userId, categoryId, data) => {
	const updated = await Category.findOneAndUpdate({ _id: categoryId, userId }, { $set: data }, { new: true });

	if (!updated) throw new Error("Category not found");
	return updated;
};

export const deleteCategory = async (userId, categoryId) => {
	const deleted = await Category.findOneAndDelete({
		_id: categoryId,
		userId,
	});
	if (!deleted) throw new Error("Category not found");
	return deleted;
};
