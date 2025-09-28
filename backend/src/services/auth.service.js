import User from "../models/User.js";

export const createUser = async (auth0Id, userData, picture) => {
	let user = await User.findOne({ auth0Id });
	if (user) return res.status(200).json(user);

	newUser = await User.create({
		auth0Id,
		...userData,
		profileImage: userData.profileImage || picture || null,
	});
	return newUser;
};
