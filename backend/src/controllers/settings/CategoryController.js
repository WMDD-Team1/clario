import * as CategoryService from "../../services/settings/CategoryService.js";

export const getCategories = async (req, res) => {
	try {
		const { id: userId } = req.user;
		const categories = await CategoryService.getCategoriesByUser(userId);
		res.status(200).json(categories);
	} catch (err) {
		console.error("Error fetching categories:", err);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const createCategory = async (req, res) => {
	try {
		const { id: userId } = req.user;
		const category = await CategoryService.createCategory(userId, req.body);
		res.status(201).json(category);
	} catch (err) {
		console.error("Error creating category:", err);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const updateCategory = async (req, res) => {
	try {
		const { id: userId } = req.user;
		const { id: categoryId } = req.params;
		const updated = await CategoryService.updateCategory(userId, categoryId, req.body);
		res.status(200).json(updated);
	} catch (err) {
		console.error("Error updating category:", err);
		res.status(404).json({ message: err.message });
	}
};

export const deleteCategory = async (req, res) => {
	try {
		const { id: userId } = req.user;
		const { id: categoryId } = req.params;
		await CategoryService.deleteCategory(userId, categoryId);
		res.status(200).json({ message: "Category deleted successfully" });
	} catch (err) {
		console.error("Error deleting category:", err);
		res.status(404).json({ message: err.message });
	}
};
