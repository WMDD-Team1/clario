import Project from "../../models/Project.js";
import Recurrence from "../../models/Recurrence.js";
import Transaction from "../../models/Transaction.js";
import mongoose from "mongoose";

export const getUpcomingReminders = async (userId, daysAhead = 7, page = 1, limit = 10) => {
	const now = new Date();
	const future = new Date();
	future.setDate(now.getDate() + daysAhead);

	const projects = await Project.find({ userId })
		.populate("clientId", "name")
		.select("name milestones clientId")
		.lean();

	const allReminders = projects.flatMap((project) =>
		(project.milestones || []).flatMap((m) =>
			(m.deliverables || [])
				.filter((d) => {
					const due = new Date(d.dueDate);
					return d.dueDate && due >= now && due <= future;
				})
				.map((d) => ({
					projectId: project._id,
					milestoneId: m._id,
					deliverableId: d._id,
					deliverableName: d.name,
					milestoneName: m.name,
					clientName: project.clientId?.name || "Unknown",
					dueDate: d.dueDate,
				}))
		)
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

export const getDashboardOverview = async (userId) => {
	const transactions = await Transaction.find({ userId, isArchived: false }).lean();

	let totalIncome = 0;
	let totalExpense = 0;
	let totalTaxes = 0;

	transactions.forEach((tx) => {
		if (tx.type === "income") {
			totalIncome += tx.baseAmount;
			totalTaxes += tx.taxAmount || 0;
		} else if (tx.type === "expense") {
			totalExpense += tx.totalAmount;
		}
	});

	const recurrences = await Recurrence.find({ userId, isArchived: false }).populate("templateTransactionId").lean();

	let recurringIncome = 0;
	let recurringExpense = 0;

	recurrences.forEach((r) => {
		const tx = r.templateTransactionId;
		if (!tx) return;

		if (tx.type === "income") recurringIncome += tx.totalAmount;
		if (tx.type === "expense") recurringExpense += tx.totalAmount;
	});

	return {
		income: totalIncome,
		expense: totalExpense,
		taxes: totalTaxes,
		recurringIncome,
		recurringExpense,
	};
};

export const getCurrentMonthIncome = async (userId) => {
	const now = new Date();
	const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

	const stats = await Transaction.aggregate([
		{
			$match: {
				userId: new mongoose.Types.ObjectId(userId),
				isArchived: false,
				date: { $gte: startOfMonth, $lte: now },
			},
		},
		{ $group: { _id: "$type", total: { $sum: "$totalAmount" } } },
	]);

	return {
		income: stats.find((s) => s._id === "income")?.total || 0,
		expense: stats.find((s) => s._id === "expense")?.total || 0,
	};
};
export const getTopExpenses = async (userId) => {
	const expenses = await Transaction.find({
		userId,
		type: "expense",
		isArchived: false,
	})
		.sort({ totalAmount: -1 })
		.limit(4)
		.select("title totalAmount date categoryId")
		.populate("categoryId", "name")
		.lean();

	const formatted = expenses.map((exp) => ({
		title: exp.title,
		amount: exp.totalAmount,
		category: exp.categoryId?.name || "Uncategorized",
		date: exp.date,
	}));

	return {
		data: formatted,
		meta: {
			total: formatted.length,
		},
	};
};

export const getMoneyFlow = async (userId) => {
	const now = new Date();
	const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

	const stats = await Transaction.aggregate([
		{
			$match: {
				userId: new mongoose.Types.ObjectId(userId),
				isArchived: false,
				date: { $gte: sixMonthsAgo, $lte: now },
			},
		},
		{
			$group: {
				_id: {
					year: { $year: "$date" },
					month: { $month: "$date" },
					type: "$type",
				},
				totalAmount: { $sum: "$totalAmount" },
			},
		},
		{
			$group: {
				_id: { year: "$_id.year", month: "$_id.month" },
				stats: { $push: { type: "$_id.type", amount: "$totalAmount" } },
			},
		},
		{ $sort: { "_id.year": 1, "_id.month": 1 } },
	]);

	const months = [];
	for (let i = 0; i < 6; i++) {
		const date = new Date(sixMonthsAgo.getFullYear(), sixMonthsAgo.getMonth() + i);
		const label = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
		months.push(label);
	}

	const monthData = months.map((month) => {
		const found = stats.find((s) => `${s._id.year}-${String(s._id.month).padStart(2, "0")}` === month);

		return {
			month,
			income: found?.stats.find((x) => x.type === "income")?.amount || 0,
			expense: found?.stats.find((x) => x.type === "expense")?.amount || 0,
		};
	});

	return {
		data: monthData,
		meta: {
			total: monthData.length,
			range: {
				start: months[0],
				end: months.at(-1),
			},
		},
	};
};
