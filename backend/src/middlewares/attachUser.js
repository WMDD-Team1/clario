import { AuthService } from "../services/index.js";

export const attachUser = async (req, res, next) => {
    try {
        const { sub: userId } = req.auth;
        const user = await AuthService.getUserByAuth0Id(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
}