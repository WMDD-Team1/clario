import jwt from "jsonwebtoken";

export const checkJWT = (req, res, next) => {
	const token = req.cookies?.session_token;

	if (!token) return res.status(401).json({ message: "No session token" });

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.auth = decoded;
		next();
	} catch (err) {
		console.error("JWT Error:", err.message);
		return res.status(401).json({ message: "Invalid session token" });
	}
};
