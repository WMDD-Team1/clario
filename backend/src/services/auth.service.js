import User from "../models/User.js";

export const createUser = async (auth0Id, userData, picture) => {
	// when user already exists
	const existed = await User.findOne({ auth0Id });
	if (existed) return { user: existed, isNew: false };

	// new user
	const newUser = await User.create({
		auth0Id,
		...userData,
		profileImage: userData.profileImage || picture || null,
	});
	return { user: newUser, isNew: true };
};
