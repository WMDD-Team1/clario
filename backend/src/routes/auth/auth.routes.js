import express from "express";
// UPDATED: Added new schema imports for login and profile validation
import { SignupSchema, LoginSchema, ProfileSchema } from "../../schemas/auth.schemas.js";
import { validate } from "../../middlewares/validate.js";
// UPDATED: Added new controller imports for login and profile functionality
import { signupController, loginController, getProfileController } from "../../controllers/auth.controller.js";
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
// NEW: Added login route with complete Swagger documentation
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description:
 *       Authenticates a user using JWT from Auth0 and returns user information.
 *       User must be already registered in the system.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found - user needs to sign up first
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found. Please sign up first."
 *       401:
 *         description: Unauthorized - JWT missing or invalid
 *       500:
 *         description: Server error
 */
// NEW: Login endpoint - POST /api/auth/login
router.post("/login", checkJWT, validate(LoginSchema), loginController);

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Get user profile
 *     description:
 *       Returns the current user's profile information using JWT from Auth0.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       401:
 *         description: Unauthorized - JWT missing or invalid
 *       500:
 *         description: Server error
 */
// NEW: Profile endpoint - GET /api/auth/profile
router.get("/profile", checkJWT, validate(ProfileSchema), getProfileController);

// EXISTING: Signup endpoint (enhanced with better validation)
router.post("/signup", checkJWT, validate(SignupSchema), signupController);


