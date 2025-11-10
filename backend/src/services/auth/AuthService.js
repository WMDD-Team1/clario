import User from "../../models/User.js";
import axios from "axios";
import { getManagementToken } from "../../utils/auth0.js";
export const createUser = async (auth0Id) => {
	// let existed = await User.findOne({ auth0Id });
	// if (existed) return { user: existed, isNew: false };

	const token = await getManagementToken();

	const { data: userInfo } = await axios.get(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${auth0Id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	let user = await User.findOne({ auth0Id });
	const isNew = !user;
	let isUpdated = false;

	if (!user) user = new User({ auth0Id });

	const { email, nickname, picture } = userInfo;
	const { user_metadata: meta } = userInfo;

	const updates = {
		email,
		name: meta.full_name || nickname || user.name,
		picture,
		userType: meta.role || user.userType,
		defaultFeeType: meta.payment_preference || user.defaultFeeType,
		goal: meta.main_goal || user.goal,
		province: meta.province || user.province || "British Columbia",
		onBoardingCompletedAt: meta.onboarding_complete
			? user.onBoardingCompletedAt || new Date()
			: user.onBoardingCompletedAt,
	};

	Object.entries(updates).forEach(([key, value]) => {
		if (value !== undefined && user[key] !== value) {
			user[key] = value;
		}
	});

	if (isNew) {
		await user.save();
	}

	return { user: user.toJSON(), isNew };
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
