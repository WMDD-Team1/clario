import { TransactionService } from '../../services/index.js';
import { archiveSchema, transactionSchema } from '../../validations/index.js';

export const getAll = async (req, res) => {
    try {
        const user = req.user;
        const { page = 1, limit = 10, ...filters } = req.query;

        const result = await TransactionService.findAll(user.id, parseInt(page), parseInt(limit), filters);

        res.status(200).json(result);
    } catch (err) {
        console.error("Error fetching transactions: ", err);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export const getById = async (req, res) => {
    try {
        const user = req.user;
        const { id: transactionId } = req.params;

        const result = await TransactionService.findOneById(transactionId, user.id);

        if (!result) return res.status(404).json({ message: "Transaction not found" });

        res.status(200).json(result);
    } catch (err) {
        console.error("Error fetching transactions: ", err);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export const create = async (req, res) => {
    try {
        const user = req.user;

        const parsedData = transactionSchema.parse(req.body);

        const result = await TransactionService.create(parsedData, user.id);
        res.status(201).json(result);
    } catch (err) {
        console.error("Error creating transaction: ", err);
        if (err.name === 'ZodError') {
            return res.status(400).json({
                message: "Invalid data",
                error: err.message,
            });
        }
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

export const update = async (req, res) => {
    try {
        const { id: transactionId } = req.params;
        const user = req.user;

        const parsedData = transactionSchema.partial().parse(req.body);
        const result = await TransactionService.update(transactionId, user.id, parsedData);

        if (!result) return res.status(404).json({ message: "Transaction not found" });

        res.status(200).json(result);
    } catch (err) {
        console.error("Error updating transaction: ", err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const archive = async (req, res) => {
    try {
        const user = req.user;
        const { id: transactionId } = req.params;
        const { isArchived } = archiveSchema.parse(req.body);

        const result = await TransactionService.archive(transactionId, user.id, isArchived);
        if (!result) return res.status(404).json({ message: "Transaction not found" });

        res.status(200).json(result);
    } catch (err) {
        console.error("Error archiving transaction: ", err);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
}