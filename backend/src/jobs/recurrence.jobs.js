import cron from "node-cron";
import { Transaction, Recurrence } from "../models/index.js";

cron.schedule("0 0 * * *", async () => {
    console.log("Daily job started at", new Date().toISOString());
    try {
        const recurrences = await Recurrence.find({
            endDate: { $gte: new Date() },
            nextRun: { $lte: new Date() },
            isArchived: false,
        }).populate('templateTransactionId');

        for (const recurrence of recurrences) {
            const template = recurrence.templateTransactionId;
            if (!template) continue;

            // Check if already created today
            const today = new Date();
            const startOfDay = new Date(today.setHours(0, 0, 0, 0));
            const endOfDay = new Date(today.setHours(23, 59, 59, 999));

            const existing = await Transaction.findOne({
                userId: template.userId,
                date: { $gte: startOfDay, $lte: endOfDay },
            });

            if (existing) continue; // skip if already created today

            // Create new transaction from template
            await Transaction.create({
                ...template.toObject(),
                _id: undefined, // let Mongo generate a new ID
                date: new Date(),
                recurrenceId: recurrence._id,
                frequency: null // New expenses are not recurrent
            });

            console.log(`Created recurring transaction for user ${template.userId}`);
        }
    } catch (err) {
        console.error('Error creating recurrent expenses: ' + err)
    }
})