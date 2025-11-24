import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { createUser, loginUser, getUserById, completeOnBoarding } from "../../services/auth/AuthService.js";
import User from "../../models/User.js";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const setSessionCookie = (res, userId) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});

	res.cookie("session_token", token, {
		httpOnly: true,
		secure: !res.req.hostname.includes("localhost"),
		sameSite: "strict",
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});
};

export const signup = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const { user } = await createUser(name, email, password);

		setSessionCookie(res, user.id);

		return res.status(201).json({
			user,
			message: "Signup successful",
		});
	} catch (err) {
		console.error("Signup Error:", err);
		return res.status(500).json({ message: err.message || "Internal Server Error" });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await loginUser(email, password);
		setSessionCookie(res, user.id);

		return res.status(200).json({ user, message: "Login successful" });
	} catch (err) {
		console.error("Login Error:", err);
		return res.status(401).json({ message: "Invalid email or password" });
	}
};

export const getUser = async (req, res) => {
	try {
		return res.status(200).json(req.user);
	} catch (err) {
		console.error("Me Error:", err);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export const onboarding = async (req, res) => {
	try {
		const updated = await completeOnBoarding(req.user.id, req.body);
		res.status(200).json(updated);
	} catch (err) {
		console.error("Onboarding Error:", err);
		res.status(400).json({ message: err.message });
	}
};

export const googleLogin = async (req, res) => {
	try {
		const { credential } = req.body;

		const ticket = await googleClient.verifyIdToken({
			idToken: credential,
			audience: process.env.GOOGLE_CLIENT_ID,
		});

		const payload = ticket.getPayload();

		const email = payload.email;
		const name = payload.name;
		const picture = payload.picture;

		let user = await User.findOne({ email });

		if (!user) {
			user = await User.create({
				email,
				name,
				picture,
				password: "google_oauth",
			});
		}

		setSessionCookie(res, user.id);

		return res.status(200).json({
			user: user.toJSON(),
			message: "Google login successful",
		});
	} catch (err) {
		console.error("Google Login Error:", err);
		return res.status(401).json({ message: "Google authentication failed" });
	}
};

export const logout = (req, res) => {
	res.clearCookie("session_token", {
		httpOnly: true,
		secure: !req.hostname.includes("localhost"),
		sameSite: "strict",
		path: "/",
	});

	return res.status(200).json({ message: "Logged out successfully" });
};
