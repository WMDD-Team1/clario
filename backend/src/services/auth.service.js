import User from "../models/User.js";

export const createUser = async (auth0Id, email, name, picture) => {
	let existed = await User.findOne({ auth0Id });
	if (existed) return { user: existed, isNew: false };

	const newUser = await User.create({
		// Added 'const' declaration for newUser
		auth0Id,
		email,
		name,
		picture,
	});
	return { user: newUser, isNew: true };
};

export const getUserByAuth0Id = async (auth0Id) => {
	return await User.findOne({ auth0Id });
};
