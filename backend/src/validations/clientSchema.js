import { z } from "zod";
import { objectIdSchema } from "./objectIdSchema.js";
import { archiveSchema } from "./archiveSchema.js";

export const clientSchema = z.object({
	userId: objectIdSchema.optional(),
	name: z.string().min(1, "Client name is required"),
	type: z.enum(["Individual", "Company"], {
		required_error: "Client type is required",
	}),
	email: z.email("Invalid email format"),
	phone: z.string().max(20, "Phone number too long").optional(),
	address: z
		.object({
			street: z.string().optional(),
			postalCode: z.string().optional(),
			city: z.string().optional(),
			country: z.string().optional(),
		})
		.optional(),
	notes: z.string().max(500, "Notes must be under 500 characters").optional(),
	isArchived: archiveSchema.optional(),
});
