import User from "../models/User.js";

export const attachUser = async (req, res, next) => {
	try {
		const { userId } = req.auth;
		const user = await User.findById(userId);

		if (!user) return res.status(404).json({ message: "User not found" });

		req.user = user;
		next();
	} catch (err) {
		next(err);
	}
};
