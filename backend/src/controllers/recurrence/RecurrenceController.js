import { RecurrenceService } from '../../services/index.js';
import { archiveSchema, transactionSchema } from '../../validations/index.js';

export const getAll = async (req, res) => {
    try {
        const user = req.user;
        const { page = 1, limit = 10, ...filters } = req.query;

        const result = await RecurrenceService.findAll(user.id, parseInt(page), parseInt(limit), filters);

        res.status(200).json(result);
    } catch (err) {
        console.error("Error fetching recurrences: ", err);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export const getById = async (req, res) => {
    try {
        const user = req.user;
        const { id: transactionId } = req.params;

        const result = await RecurrenceService.findOneById(transactionId, user.id);

        if (!result) return res.status(404).json({ message: "Recurrence not found" });

        res.status(200).json(result);
    } catch (err) {
        console.error("Error fetching recurrences: ", err);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export const create = async (req, res) => {
    try {
        const user = req.user;

        const parsedData = transactionSchema.parse(req.body);

        const result = await RecurrenceService.create(parsedData, user.id);
        res.status(201).json(result);
    } catch (err) {
        console.error("Error creating recurrence: ", err);
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
        const result = await RecurrenceService.update(transactionId, user.id, parsedData);

        if (!result) return res.status(404).json({ message: "Recurrence not found" });

        res.status(200).json(result);
    } catch (err) {
        console.error("Error updating recurrence: ", err);
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

        const result = await RecurrenceService.archive(transactionId, user.id, isArchived);
        if (!result) return res.status(404).json({ message: "Recurrence not found" });

        res.status(200).json(result);
    } catch (err) {
        console.error("Error archiving recurrence: ", err);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
}