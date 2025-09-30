import { z } from "zod";

export const SignupSchema = z.object({

		email: z.string().email(), 
		name: z.string().min(3).max(50),
		profileImage: z.string().url().optional(), 
});