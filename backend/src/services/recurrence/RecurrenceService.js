import { Recurrence } from "../../models/index.js";
import { RecurrenceService, TransactionService } from "../index.js";

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
        .findOne({ _id: id, userId }).populate("templateTransactionId");

    return {
        ...recurrence.toJSON(),
    }
};

export const create = async (data, userId) => {
    const { templateTransactionId: transactionId, frequency } = data;
    const transaction = await TransactionService.findOneById(transactionId, userId);
    if (!transaction || transaction.frequency !== undefined) throw new TypeError('Invalid template transaction');

    await TransactionService.update(transactionId, userId, { frequency: frequency });
    data.templateTransactionId = transaction._id;

    return await Recurrence.create({
        ...data,
        userId,
    })
};

export const update = async (id, userId, data) => {
    const { frequency } = data;
    if (frequency) {
        const recurrence = await RecurrenceService.findOneById(id, userId);
        await TransactionService.update(recurrence.templateTransactionId.id, userId, { frequency: frequency });
    }


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
    const recurrence = await RecurrenceService.findOneById(id, userId);
    const frequency = isArchived ? null : recurrence.frequency
    await TransactionService.update(recurrence.templateTransactionId.id, userId, { frequency: frequency });
    return await Recurrence.findOneAndUpdate(
        {
            _id: id,
            userId,
        },
        { isArchived },
        { new: true }
    );
};