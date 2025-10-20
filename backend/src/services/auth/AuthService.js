import User from "../../models/User.js";

export const createUser = async (auth0Id, email, name, picture) => {
	let existed = await User.findOne({ auth0Id });
	if (existed) return { user: existed, isNew: false };

	const newUser = await User.create({
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

export const completeOnBoarding = async (userId, payload) => {
	const user = await User.findOne({ _id: userId });

	if (!user) throw new Error("User not found");

	if (user.onBoardingCompletedAt) {
		throw new Error("Onboarding already completed");
	}

	user.userType = payload.userType || user.userType;
	user.defaultFeeType = payload.defaultFeeType || user.defaultFeeType;
	user.goal = payload.goal || user.goal;
	user.onBoardingCompletedAt = new Date();

	await user.save();
	return user;
};
