import { ZodError } from "zod";

export const validate = (schema) => {
	return async (req, res, next) => {
		try {
			const parsed = await schema.parseAsync({
				body: req.body,
				query: req.query,
				params: req.params,
			});

			req.body = parsed.body ?? req.body;
			req.query = parsed.query ?? req.query;
			req.params = parsed.params ?? req.params;

			next();
		} catch (err) {
			if (err instanceof ZodError) {
				return res.status(400).json({
					message: "Validation Error",
					errors: err.errors.map((e) => ({
						path: e.path.join("."),
						message: e.message,
					})),
				});
			}
			next(err);
		}
	};
};
