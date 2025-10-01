export const validate = (schema) => {
	return async (req, res, next) => {
		try {
			const parsed = await schema.parse(req.body);

			req.body = parsed.body;

			next();
		} catch (err) {
			if (err.errors) {
				return res.status(400).json({
					message: "Validation Error",
					errors: err.errors.map((e) => ({
						path: e.path.join("."),
						message: e.message,
					})),
				});
			}
			return next(err);
		}
	};
};
