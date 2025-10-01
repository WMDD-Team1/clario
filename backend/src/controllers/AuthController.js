import { createUser, getUserByAuth0Id } from "../services/auth/AuthService.js";

export const signupController = async (req, res) => {
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
		return res.status(500).json({ message: "Server Error" });
	}
};

export const loginController = async (req, res) => {
	try {
		const { sub: auth0Id } = req.auth;
		const user = await getUserByAuth0Id(auth0Id);
		console.log(user);
		const clientData = req.body || {};

		const matches = {
			email: clientData.email ? clientData.email === user.email : true,
			name: clientData.name ? clientData.name === user.name : true,
		};

		if (!matches.email || !matches.name) {
			return res.status(400).json({
				valid: false,
				message: "Provided values do not match Auth0 data",
			});
		}
		const useremail = user.email;
		const username = user.name;
		return res.status(200).json({
			valid: true,
			user: {
				auth0Id,
				useremail,
				username,
			},
		});
	} catch (err) {
		console.error("Login Error: ", err);
		return res.status(500).json({ message: "Server Error" });
	}
};
