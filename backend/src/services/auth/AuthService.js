import User from "../../models/User.js";
import bcrypt from "bcrypt";

export const createUser = async (name, email, password) => {
	const existing = await User.findOne({ email });
	if (existing) throw new Error("User already exists");

	const hashed = await bcrypt.hash(password, 10);

	const user = await User.create({
		name,
		email,
		password: hashed,
		picture: null,
	});

	return { user: user.toJSON(), isNew: true };
};

export const loginUser = async (email, password) => {
	const user = await User.findOne({ email });
	if (!user) throw new Error("Invalid email or password");

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) throw new Error("Invalid email or password");

	return user.toJSON();
};

export const getUserById = (id) => User.findById(id);

export const completeOnBoarding = async (userId, payload) => {
	const user = await User.findById(userId);
	if (!user) throw new Error("User not found");
	if (user.onBoardingCompletedAt) throw new Error("Onboarding already completed");

	user.userType = payload.userType || user.userType;
	user.defaultFeeType = payload.defaultFeeType || user.defaultFeeType;
	user.goal = payload.goal || user.goal;
	user.onBoardingCompletedAt = new Date();

	await user.save();
	return user;
};
