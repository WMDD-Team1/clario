import dotenv from "dotenv";
dotenv.config();
import { expressjwt } from "express-jwt";
import jwksRsa from "jwks-rsa";

export const checkJWT = expressjwt({
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `https://${process.env.AUTH0_CLIENT_DOMAIN}/.well-known/jwks.json`,
	}),
	audience: process.env.AUTH0_AUDIENCE,
	issuer: `https://${process.env.AUTH0_CLIENT_DOMAIN}/`,
	algorithms: ["RS256"],
});
