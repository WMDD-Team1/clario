import { z } from "zod";

// FIXED: Improved validation schema for signup
export const SignupSchema = z.object({
	body: z.object({
		email: z.string().email(), // FIXED: Changed from z.email() to z.string().email()
		name: z.string().min(3).max(50), // FIXED: Increased max length from 10 to 50
		userType: z.enum(["Freelancer", "Contractor"]),
		profileImage: z.string().url().optional(), // FIXED: Changed from z.url() to z.string().url()
		province: z.string().optional(),
		currency: z.string().optional(), // FIXED: Changed from z.optional() to z.string().optional()
		onBoardingCompletedAt: z.date().optional(), // FIXED: Changed from z.optional().default(null) to z.date().optional()
	}),
});

// NEW: Added LoginSchema for login endpoint validation
// Login doesn't need body validation since it uses JWT from Auth0
// The JWT middleware handles authentication
export const LoginSchema = z.object({
	// Login endpoint uses JWT authentication, no request body validation needed
});

// NEW: Added ProfileSchema for profile endpoint validation
// Profile endpoint also uses JWT authentication, no request body validation needed
export const ProfileSchema = z.object({
	// Profile endpoint uses JWT authentication, no request body validation needed
});
