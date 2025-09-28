import { z } from "zod";

export const SignupSchema = z.object({
	body: z.object({
		email: z.email(),
		name: z.string().min(3).max(10),
		userType: z.enum(["Freelancer", "Contractor"]),
		profileImage: z.url().optional(),
		province: z.string().optional(),
		currency: z.optional(),
		onBoardingCompletedAt: z.optional().default(null),
	}),
});
