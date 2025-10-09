/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs including signup and login
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Signup - create or return a user
 *     description:
 *       Creates a new user after verifying JWT from Auth0.<br />
 *       - If the user already exists → returns **200 OK** with existing user.<br />
 *       - If a new user is created → returns **201 Created** with new user data.<br />
 *       This endpoint requires a valid Bearer JWT token in the `Authorization` header.<br />
 *      - **No request body is required.** email and name are taken from the JWT custom claims.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
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

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login - return a user
 *     description: >
 *       Verifies the user’s identity using the Auth0 JWT. <br />
 *       - Requires a valid Auth0 JWT (Bearer token). <br />
 *       - No request body is required.<br />
 *       - If the user exists in the database, returns the user object.<br />
 *       - If the user does not exist, returns **404 Not Found**.<br />
 *       - Does not create or modify any records.<br />
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User successfully logged in (returns a user)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found (signup required)
 *       401:
 *         description: Unauthorized (invalid/missing JWT)
 *       500:
 *         description: Server error
 */
