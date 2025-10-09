export const validate = (schema) => {
	return (req, res, next) => {
		try {
			req.auth = schema.parse(req.auth);
			next();
		} catch (e) {
			return res.status(400).json({
				message: "Invalid token sent",
				issues: e.errors ?? e.message,
			});
		}
	};
};
