import { Transaction } from "../../models/index.js";

// CRUD
export const findAll = async (userId, page, limit) => {
    const skip = (page - 1) * limit;
    const [transactions, total] = await Promise.all([
        Transaction.find({ userId })
            .skip(skip)
            .limit(limit)
            .sort({ date: 1 })
            .lean(),
        Transaction.countDocuments({ userId }),
    ])

    return { transactions, meta: { total, page, limit } };
};

export const findOneById = async (IdleDeadline, userId) => {
    return await Transaction.findOne({ _id: IdleDeadline, userId })
        .lean()
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