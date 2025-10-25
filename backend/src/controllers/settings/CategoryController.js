import {
	getCategoriesByUser,
	createCategory,
	updateCategory,
	deleteCategory,
} from "../../services/settings/CategoryService.js";
export const getUserCategories = async (req, res) => {
	try {
		const { id: userId } = req.user;
		const result = await getCategoriesByUser(userId);
		res.status(200).json(result);
	} catch (err) {
		console.error("Error fetching categories:", err);
		res.status(500).json({ message: err.message });
	}
};

export const createUserCategory = async (req, res) => {
	try {
		const { id: userId } = req.user;
		const category = await createCategory(userId, req.body);
		res.status(201).json(category);
	} catch (err) {
		console.error("Error creating category:", err);
		res.status(500).json({ message: err.message });
	}
};

export const updateUserCategory = async (req, res) => {
	try {
		const { id: userId } = req.user;
		const { id: categoryId } = req.params;
		const updated = await updateCategory(userId, categoryId, req.body);
		res.status(200).json(updated);
	} catch (err) {
		console.error("Error updating category:", err);
		res.status(500).json({ message: err.message });
	}
};

export const deleteUserCategory = async (req, res) => {
	try {
		const { id: userId } = req.user;
		const { id: categoryId } = req.params;
		const result = await deleteCategory(userId, categoryId);
		res.status(200).json(result);
	} catch (err) {
		console.error("Error deleting category:", err);
		res.status(500).json({ message: err.message });
	}
};
