import { z } from "zod";

export const clientSchema = z.object({
	name: z.string().min(1, "Client name is required"),
	type: z.enum(["Individual", "Company"]),
	email: z.email("Invalid email format"),
	contact: z.string().optional(),
	address: z.string().optional(),
	billingAddress: z.string().optional(),
	description: z.string().optional(),
});
