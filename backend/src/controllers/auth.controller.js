import { createUser } from "../services/auth.service.js";

export const signupController = async (req, res) => {
	try {
		const { sub: auth0Id, picture } = req.auth;
		const userData = req.body;

		const newUser = await createUser(auth0Id, userData, picture);
		if(isNew){
			return res.status(201).json(newUser);
		}
		return res.status(201).json(user);
	} catch (err) {
		console.error("Signup Error: ", err);
		return res.status(500).json({ message: "Server Error" });
	}
};

export const loginController = async (req, res) => {
  try {
    const { sub: auth0Id, email, name } = req.auth;
    const clientData = req.body || {};

    const matches = {
      email: clientData.email ? clientData.email === email : true,
      name: clientData.name ? clientData.name === name : true,
    };

    if (!matches.email || !matches.name) {
      return res.status(400).json({
        valid: false,
        message: "Provided values do not match Auth0 data",
      });
    }

    return res.status(200).json({
      valid: true,
      user: {
        auth0Id,
        email,
        name,
      },
    });
  } catch (err) {
    console.error("Login Error: ", err);
    return res.status(500).json({ message: "Server Error" });
  }
};