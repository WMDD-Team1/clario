import { openai } from "../../config/openai.js";
import { TransactionService } from "../../services/index.js";

export const getTransactionsInsights = async (req, res) => {
    try {
        // Preparing AI prompt
        const user = req.user;
        const startOfYear = new Date(new Date().getFullYear(), 0, 1);
        const filters = { date: { $gte: startOfYear } }
        const transactions = await TransactionService.findAll(user.id, 1, -1, filters)
        if (transactions.meta.total === 0) return res.status(404).json({ message: "No transactions found to analyze" });
        const prompt = `
            Give 5 insights based on the transactions of my income and expenses.
            Each as an object with title, text and month. Month could be This Month ot Next Month.
            The insights must be not related to archived status
            Transactions: ${JSON.stringify(transactions.data)}
        `
        const response = await openai.chat.completions.create({
            model: "chatgpt-4o-latest",
            response_format: { type: "json_object" },
            messages: [
                { role: "system", content: "You are a financial assistant for a freelancer. Return your response as a JSON object or array only, with no explanations." },
                { role: "user", content: prompt }
            ],
        });

        // Handling AI response
        const reply = JSON.parse(response.choices[0].message.content);
        if (reply.error) return req.status(400).json({
            message: "Error getting transaction insights",
            error: reply.error
        })

        res.status(200).send({
            data: reply.insights,
            meta: {
                total: 5
            }
        })
    } catch (err) {
        console.error("Error getting transaction insights: " + err);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
} 