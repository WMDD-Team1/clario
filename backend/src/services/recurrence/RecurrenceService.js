import { Recurrence } from "../../models/index.js";

// CRUD
export const findAll = async (userId, page, limit, filters) => {
    const skip = (page - 1) * limit;
    const [recurrences, total] = await Promise.all([
        Recurrence.find({ ...filters, userId })
            .skip(skip)
            .limit(limit)
            .sort({ date: 1 }),
        Recurrence.countDocuments({ ...filters, userId }),
    ])

    const data = recurrences.map((transaction) => ({
        ...transaction.toJSON(),
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
    const recurrence = await Recurrence
        .findOne({ _id: id, userId });

    return {
        ...recurrence.toJSON(),
    }
};

export const create = async (data, userId) => {
    return await Recurrence.create({
        ...data,
        taxAmount,
        totalAmount,
        userId,
    })
};

export const update = async (id, userId, data) => {
    return await Recurrence.findOneAndUpdate(
        {
            _id: id,
            userId,
        },
        data,
        { new: true }
    );
};

export const archive = async (id, userId, isArchived) => {
    return await Recurrence.findOneAndUpdate(
        {
            _id: id,
            userId,
        },
        { isArchived },
        { new: true }
    );
};