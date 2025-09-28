import express from "express";
import { SignupSchema } from "../../schemas/auth.schemas.js";
import { validate } from "../../middlewares/validate.js";
import { signupController } from "../../controllers/auth.controller.js";
import { checkJWT } from "../../middlewares/checkJWT.js";

export const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication and signup APIs
 */
/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Create or return a user
 *     description:
 *       Creates a new user in MongoDB after verifying JWT from Auth0.
 *       If the user already exists, returns the existing user.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Signup'
 *     responses:
 *       200:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       201:
 *         description: User successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - JWT missing or invalid
 *       500:
 *         description: Server error
 */
router.post("/signup", checkJWT, validate(SignupSchema), signupController);
