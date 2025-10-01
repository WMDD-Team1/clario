import { z } from "zod";

export const SignupSchema = z.object({
	sub: z.string().min(1),
	"https://clario.com/email": z.email(),
	"https://clario.com/name": z.string().min(3),
	"https://clario.com/picture": z.url().optional(),
});
