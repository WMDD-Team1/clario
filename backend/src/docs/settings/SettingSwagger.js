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

/**
 * @swagger
 * /api/settings/categories/incomes:
 *   get:
 *     summary: Get user's income categories
 *     description: Fetches the list of income categories saved in the user's finance settings.
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved income categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Project Income", "Consulting", "Recurring Income"]
 *       401:
 *         description: Unauthorized
 *
 *   patch:
 *     summary: Update user's income categories
 *     description: Replaces the current list of income categories with a new one.
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
 *               categories:
 *                 type: array
 *                 description: Updated list of income category labels
 *                 items:
 *                   type: string
 *                 example: ["Project Income", "Consulting", "Royalties"]
 *     responses:
 *       200:
 *         description: Income categories updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Income categories updated"
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Project Income", "Consulting", "Royalties"]
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/settings/categories/expenses:
 *   get:
 *     summary: Get user's expense categories
 *     description: Fetches the list of expense categories saved in the user's finance settings.
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved expense categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Software & Tools", "Subscriptions", "Taxes"]
 *       401:
 *         description: Unauthorized
 *
 *   patch:
 *     summary: Update user's expense categories
 *     description: Replaces the current list of expense categories with a new one.
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
 *               categories:
 *                 type: array
 *                 description: Updated list of expense category labels
 *                 items:
 *                   type: string
 *                 example: ["Software & Tools", "Subscriptions", "Marketing"]
 *     responses:
 *       200:
 *         description: Expense categories updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Expense categories updated"
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Software & Tools", "Subscriptions", "Marketing"]
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/settings/export/transactions:
 *   get:
 *     summary: Export all user transactions (income & expense) as CSV
 *     description: |
 *       Downloads a CSV file containing all income and expense transactions for the authenticated user.
 *       Each row includes title, type, amounts, category, payment method, and date.
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully exported CSV file
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               example: |
 *                 Title,Type,Category,Amount (Total),Tax Amount,Base Amount,Date,Payment Method,Notes,Frequency
 *                 Website Design,income,Project Income,2800,300,2500,2025-11-02,Stripe,Design phase payment,monthly
 *                 Figma Pro,expense,Software & Tools,45,0,45,2025-11-01,Credit Card,Subscription renewal,monthly
 *       401:
 *         description: Unauthorized — Missing or invalid bearer token
 *       404:
 *         description: No transactions found for the user
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/settings/password:
 *   post:
 *     summary: Change user password
 *     description: >
 *       Allows a logged-in user to change their password.
 *       <br><br>
 *       Even if the user is already authenticated, the current password must be verified again
 *       for security reasons before updating the password in Auth0.
 *     tags:
 *       - Settings
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *               - confirmPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 format: password
 *                 example: myCurrentPassword123!
 *                 description: The user's current password (for verification).
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 example: MyNewPassword!2025
 *                 description: The new password to set.
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 example: MyNewPassword!2025
 *                 description: Must match the newPassword.
 *     responses:
 *       200:
 *         description: Password updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password updated successfully
 *       400:
 *         description: Bad Request – current password is incorrect or new passwords do not match.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Current password incorrect
 *       401:
 *         description: Unauthorized – user token missing or invalid.
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
