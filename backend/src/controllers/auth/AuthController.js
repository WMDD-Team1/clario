import { createUser, getUserByAuth0Id } from "../../services/auth/AuthService.js";

export const signup = async (req, res) => {
	try {
		const { sub: auth0Id } = req.auth;
		// added credentials in access token so that backend can save the data right away to db.
		const email = req.auth["https://clario.com/email"];
		const name = req.auth["https://clario.com/name"];
		const picture = req.auth["https://clario.com/picture"];

		const { user, isNew } = await createUser(auth0Id, email, name, picture);

		return res.status(isNew ? 201 : 200).json(user);
	} catch (err) {
		console.error("Signup Error: ", err);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export const login = async (req, res) => {
	try {
		const { sub: auth0Id } = req.auth;
		const user = await getUserByAuth0Id(auth0Id);

		if (!user) {
			return res.status(404).json({
				message: "User not found.",
			});
		}
		res.status(200).json(user);
	} catch (err) {
		console.error("Login Error: ", err);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};
