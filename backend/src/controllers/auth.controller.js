import { createUser } from "../services/auth.service.js";

export const signupController = async (req, res) => {
	try {
		const { sub: auth0Id, picture } = req.auth;
		const userData = req.body;

		const { user, isNew } = await createUser(auth0Id, userData, picture);

		if (isNew) {
			return res.status(201).json(user);
		}

		return res.status(200).json(user);
	} catch (err) {
		console.error("Signup Error: ", err);
		return res.status(500).json({ message: "Server Error" });
	}
};
