import { Transaction } from "../../models/index.js";

// CRUD
export const findAll = async (userId, page, limit) => {
    const skip = (page - 1) * limit;
    const [transactions, total] = await Promise.all([
        Transaction.find({ userId })
            .skip(skip)
            .limit(limit)
            .sort({ date: 1 })
            .populate("projectId", "name _id"),
        Transaction.countDocuments({ userId }),
    ])

    const data = transactions.map((transaction) => ({
        ...transaction.toJSON(),
        projectName: transaction.projectId?.name || null,
    }))

    return {
        data,
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        }
    };
};

export const findOneById = async (id, userId) => {
    const transaction = await Transaction
        .findOne({ _id: id, userId })
        .populate("projectId", "name _id");

    return {
        ...transaction.toJSON(),
        projectName: transaction.projectId?.name || "null",
    }
};

export const create = async (data, userId) => {
    return await Transaction.create({
        ...data,
        userId,
    })
};

export const update = async (id, userId, data) => {
    return await Transaction.findOneAndUpdate(
        {
            _id: id,
            userId,
        },
        data,
        { new: true }
    );
};

export const archive = async (id, userId, isArchived) => {
    return await Transaction.findOneAndUpdate(
        {
            _id: id,
            userId,
        },
        { isArchived },
        { new: true }
    );
};