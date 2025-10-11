import { z } from "zod";

export const projectSchema = z.object({
	clientId: z.string().min(1, "Client ID is required"),
	name: z.string().min(1, "Project name is required"),
	type: z.string().optional(),
	description: z.string().optional(),
	fee: z.number().nonnegative("Fee must be a non-negative number"),
	feeType: z.enum(["milestone", "deliverable", "fixed", "subscription", "hourly"]),
	taxable: z.boolean().default(false),
	color: z
		.string()
		.regex(/^#([0-9a-fA-F]{3}){1,2}$/, "Invalid hex color format")
		.optional(),
	status: z.enum(["planned", "in-progress", "completed", "cancelled"]).default("planned"),
	isArchived: z.boolean().default(false),
	startDate: z.coerce.date(),
	endDate: z.coerce.date(),
});
