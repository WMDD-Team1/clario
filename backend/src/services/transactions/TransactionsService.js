import { Transaction } from "../../models/index.js";
import { SettingsService } from "../index.js";

// CRUD
export const findAll = async (userId, page, limit, filters) => {
    const skip = (page - 1) * limit;
    const [transactions, total] = await Promise.all([
        Transaction.find({ ...filters, userId })
            .skip(skip)
            .limit(limit)
            .sort({ date: 1 }),
        Transaction.countDocuments({ ...filters, userId }),
    ])

    const data = transactions.map((transaction) => ({
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
    return await Transaction
        .findOne({ _id: id, userId })
        .populate("projectId");
};

export const create = async (data, userId) => {
    const { baseAmount, type } = data;

    let taxAmount = 0;
    let totalAmount = data.baseAmount;
    if (type === 'income') {
        const settings = await SettingsService.getUserSettings(userId);
        const province = settings.finance?.province || "British Columbia";
        const taxRate = province === "British Columbia" ? 0.12 : 0.14975;

        taxAmount = baseAmount * taxRate;
        totalAmount = baseAmount + taxAmount;
    }

    return await Transaction.create({
        ...data,
        taxAmount,
        totalAmount,
        userId,
    })
};

export const update = async (id, userId, data) => {
    const { baseAmount } = data;
    const transaction = await findOneById(id, userId);
    data.totalAmount = baseAmount;
    if (baseAmount && transaction.type === 'income') {
        const settings = await SettingsService.getUserSettings(userId);
        const province = settings.finance?.province || "British Columbia";
        const taxRate = province === "British Columbia" ? 0.12 : 0.14975;

        const taxAmount = baseAmount * taxRate;
        const totalAmount = baseAmount + taxAmount;

        data.taxAmount = taxAmount;
        data.totalAmount = totalAmount;
    }

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