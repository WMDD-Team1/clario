/**
 * @swagger
 * tags:
 *   name: Settings
 *   description: Manage user profile, preferences, and finance settings
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserProfile:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Bitna Lee"
 *         email:
 *           type: string
 *           example: "bitna@example.com"
 *         picture:
 *           type: string
 *           format: url
 *           example: "https://cdn.auth0.com/avatars/bitna.png"
 *
 *     UserPreferences:
 *       type: object
 *       properties:
 *         language:
 *           type: string
 *           enum: [en, fr]
 *           example: "en"
 *         theme:
 *           type: string
 *           enum: [light, dark]
 *           example: "light"
 *
 *     FinanceSettings:
 *       type: object
 *       properties:
 *         province:
 *           type: string
 *           enum: ["British Columbia", "Quebec"]
 *           example: "British Columbia"
 *
 *     UserSettingsResponse:
 *       type: object
 *       properties:
 *         profile:
 *           $ref: '#/components/schemas/UserProfile'
 *         settings:
 *           type: object
 *           properties:
 *             general:
 *               $ref: '#/components/schemas/UserPreferences'
 *             finance:
 *               $ref: '#/components/schemas/FinanceSettings'
 */

/**
 * @swagger
 * /api/settings:
 *   get:
 *     summary: Get user profile and settings
 *     description: Fetches user's profile and preference/finance settings.
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user settings
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserSettingsResponse'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/settings/profile:
 *   patch:
 *     summary: Update user profile (Auth0 + local DB)
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Bitna Lee"
 *               email:
 *                 type: string
 *                 example: "bitna@example.com"
 *               picture:
 *                 type: string
 *                 format: url
 *                 example: "https://cdn.auth0.com/avatars/bitna.png"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/settings/preferences:
 *   patch:
 *     summary: Update user language or theme
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserPreferences'
 *     responses:
 *       200:
 *         description: Preferences updated successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/settings/finance:
 *   patch:
 *     summary: Update finance-related settings
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FinanceSettings'
 *     responses:
 *       200:
 *         description: Finance settings updated successfully
 *       401:
 *         description: Unauthorized
 */
