/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs including signup and login
 */

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
 *       Creates a new user after verifying JWT from Auth0.<br />
 *       - If the user already exists → returns **200 OK** with existing user.<br />
 *       - If a new user is created → returns **201 Created** with new user data.<br />
 *       This endpoint requires a valid Bearer JWT token in the `Authorization` header.
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
 *         description: User already exists (returns existing user)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       201:
 *         description: User successfully created (returns new user)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error (invalid input payload)
 *       401:
 *         description: Unauthorized - JWT missing or invalid
 *       500:
 *         description: Internal server error
 */
