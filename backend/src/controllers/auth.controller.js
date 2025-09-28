import { createUser } from "../services/auth.service.js";

export const signupController = async (req, res) => {
	try {
		const { sub: auth0Id, picture } = req.auth;
		const userData = req.body;

		const newUser = createUser(auth0Id, userData, picture);

		return res.status(201).json(newUser);
	} catch (err) {
		console.error("Signup Error: ", err);
		return res.status(500).json({ message: "Server Error" });
	}
};
