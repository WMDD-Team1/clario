/**
 * @swagger
 * tags:
 *   name: Settings - Categories
 *   description: Manage income and expense categories embedded in user settings
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "670a12b4d9e4fa1234abcd99"
 *         name:
 *           type: string
 *           example: "Software Subscriptions"
 *         type:
 *           type: string
 *           enum: [income, expense]
 *           example: "expense"
 *
 *     CategoryInput:
 *       type: object
 *       required:
 *         - name
 *         - type
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the category
 *           example: "Client Payments"
 *         type:
 *           type: string
 *           description: Type of the category
 *           enum: [income, expense]
 *           example: "income"
 *
 *     CategoryListResponse:
 *       type: object
 *       properties:
 *         income:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Category'
 *         expense:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Category'
 */

/**
 * @swagger
 * /api/settings/categories:
 *   get:
 *     summary: Get all categories grouped by type
 *     tags: [Settings - Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved categories
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryListResponse'
 *       401:
 *         description: Unauthorized
 *
 *   post:
 *     summary: Create a new category
 *     tags: [Settings - Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryInput'
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/settings/categories/{id}:
 *   patch:
 *     summary: Update a category
 *     tags: [Settings - Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID (embedded subdocument _id)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryInput'
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 *       401:
 *         description: Unauthorized
 *
 *   delete:
 *     summary: Delete a category
 *     tags: [Settings - Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID (embedded subdocument _id)
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       401:
 *         description: Unauthorized
 */
