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

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user with Auth0 (email + name only)
 *     description: >
 *       Verifies the user’s **email and name** against the claims inside the Auth0 JWT.  
 *       - Requires a valid Auth0 JWT (Bearer token).  
 *       - Does not create or modify any database records.  
 *       - If email or name are provided in the request body, they must match the JWT claims.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "bitna@1234.com"
 *               name:
 *                 type: string
 *                 example: "Bitna Lee"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valid:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   type: object
 *                   properties:
 *                     auth0Id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     name:
 *                       type: string
 *       400:
 *         description: Provided values do not match Auth0 data
 *       401:
 *         description: Unauthorized (invalid/missing JWT)
 *       500:
 *         description: Server error
 */
