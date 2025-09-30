import User from "../models/User.js";

export const createUser = async (auth0Id, userData, picture) => {
	let existed = await User.findOne({ auth0Id });
	if (existed) return {user: existed, isNew: false};

	const newUser = await User.create({ // Added 'const' declaration for newUser
		auth0Id,
		...userData,
		profileImage: userData.profileImage || picture || null,
	});
	return {user: newUser,isNew:true};
};