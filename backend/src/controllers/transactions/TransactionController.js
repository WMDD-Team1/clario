import { AuthService, TransactionService } from '../../services/index.js';

export const getAll = async (req, res) => {
    try {
        const { sub: userId } = req.auth;
        const { page = 1, limit = 10 } = req.query;


        const user = AuthService.getUserByAuth0Id(userId);
        if (!user){
            return res.status(404).json({ message: 'User not found in local DB' });
        }

        const result = await TransactionService.findAll(user.id, parseInt(page), parseInt(limit));

        res.status(200).json(result);
    } catch (err) {
        console.error("Error fetching transactions: ", err);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}