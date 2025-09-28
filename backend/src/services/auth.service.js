import User from "../models/User.js";

// FIXED: Original createUser function had bugs - removed 'res' reference and fixed 'newUser' declaration
export const createUser = async (auth0Id, userData, picture) => {
	let user = await User.findOne({ auth0Id });
	if (user) return user; // FIXED: Removed invalid 'res.status(200).json(user)' - just return user

	const newUser = await User.create({ // FIXED: Added 'const' declaration for newUser
		auth0Id,
		...userData,
		profileImage: userData.profileImage || picture || null,
	});
	return newUser;
};

// NEW: Added loginUser function for user authentication
// This function finds a user by their Auth0 ID and returns user data
export const loginUser = async (auth0Id) => {
	try {
		const user = await User.findOne({ auth0Id });
		if (!user) {
			throw new Error("User not found");
		}
		return user;
	} catch (error) {
		throw error;
	}
};

// NEW: Added getUserById function for profile retrieval
// This function finds a user by their MongoDB ID and returns user data
export const getUserById = async (userId) => {
	try {
		const user = await User.findById(userId);
		if (!user) {
			throw new Error("User not found");
		}
		return user;
	} catch (error) {
		throw error;
	}
};
