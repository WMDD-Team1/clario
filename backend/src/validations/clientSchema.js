import { z } from "zod";
import { objectIdSchema } from "./objectIdSchema.js";
import { archiveSchema } from "./archiveSchema.js";
export const clientSchema = z.object({
	userId: objectIdSchema.optional(),

	name: z.string().min(1, "Client name is required"),

	email: z.email("Invalid email format").min(1, "Email is required"),

	phone: z.string().max(20, "Phone number too long").optional().or(z.literal("")),

	address: z
		.object({
			street: z.string().optional(),
			postalCode: z.string().optional(),
			city: z.string().optional(),
			country: z.string().optional(),
		})
		.optional(),

	notes: z.string().max(500, "Notes must be under 500 characters").optional().or(z.literal("")),

	isArchived: z.boolean().default(false),
});
