// UPDATED: Added new imports for login and profile functionality
import { createUser, loginUser, getUserById } from "../services/auth.service.js";

export const signupController = async (req, res) => {
	try {
		const { sub: auth0Id, picture } = req.auth;
		const userData = req.body;

		const newUser = await createUser(auth0Id, userData, picture); // FIXED: Added 'await'

		return res.status(201).json(newUser);
	} catch (err) {
		console.error("Signup Error: ", err);
		return res.status(500).json({ message: "Server Error" });
	}
};


// This controller handles user login requests and returns user data
export const loginController = async (req, res) => {
	try {
		const { sub: auth0Id } = req.auth; // Extract Auth0 ID from JWT token
		
		const user = await loginUser(auth0Id); // Call service to find user
		
		return res.status(200).json({
			message: "Login successful",
			user: user
		});
	} catch (err) {
		console.error("Login Error: ", err);
		//Specific error handling for user not found
		if (err.message === "User not found") {
			return res.status(404).json({ message: "User not found. Please sign up first." });
		}
		return res.status(500).json({ message: "Server Error" });
	}
};

// This controller handles requests to get current user's profile information
export const getProfileController = async (req, res) => {
	try {
		const { sub: auth0Id } = req.auth; // Extract Auth0 ID from JWT token
		
		const user = await loginUser(auth0Id); // Call service to find user
		
		return res.status(200).json({
			user: user
		});
	} catch (err) {
		console.error("Get Profile Error: ", err);
		// Specific error handling for user not found
		if (err.message === "User not found") {
			return res.status(404).json({ message: "User not found" });
		}
		return res.status(500).json({ message: "Server Error" });
	}
};
