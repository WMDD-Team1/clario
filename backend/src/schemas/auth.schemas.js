import { z } from "zod";

export const SignupSchema = z.object({
	email: z.email(),
	name: z.string().min(3).max(10),
	profileImage: z.url().optional(),
});
