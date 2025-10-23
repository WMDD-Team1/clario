import { z } from "zod";

const deliverableSchema = z.object({
	name: z.string().min(1, "Deliverable name is required"),
	description: z.string().optional().nullable(),
	fileUrl: z.url().optional().nullable(),
	dueDate: z.coerce.date().optional().nullable(),
});
const milestoneSchema = z.object({
	name: z.string().min(1, "Milestone name is required"),
	description: z.string().optional().nullable(),
	amount: z.number().nonnegative("Amount must be a positive number"),
	dueDate: z.coerce.date().optional().nullable(),
	generateInvoice: z.enum(["on_completion", "on_due_date"]).default("on_completion"),
	deliverables: z.array(deliverableSchema).optional(),
});

export const projectSchema = z.object({
	clientId: z.string().min(1, "Client ID is required"),
	name: z.string().min(1, "Project name is required"),
	description: z.string().optional().nullable(),
	type: z.string().optional().nullable(),
	totalBudget: z.number().optional().nullable(),
	status: z.enum(["Planning", "In-Progress", "Done"]).default("Planning"),
	isActive: z.boolean().optional().default(false),
	isArchived: z.boolean().optional().default(false),
	startDate: z.coerce.date().optional().nullable(),
	dueDate: z.coerce.date().optional().nullable(),
	milestones: z.array(milestoneSchema).optional(),
});
