/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Manage income and expense categories for a user
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
 *           enum: [Income, Expense]
 *           example: "Expense"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-10-20T05:35:21.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-10-20T05:35:21.000Z"
 *
 *     CategoryInput:
 *       type: object
 *       required:
 *         - name
 *         - type
 *       properties:
 *         name:
 *           type: string
 *           example: "Client Payments"
 *         type:
 *           type: string
 *           enum: [Income, Expense]
 *           example: "Income"
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
 * /api/categories:
 *   get:
 *     summary: Get all categories grouped by type
 *     tags: [Categories]
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
 */

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
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
 * /api/categories/{id}:
 *   patch:
 *     summary: Update a category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryInput'
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 *       401:
 *         description: Unauthorized
 *
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       401:
 *         description: Unauthorized
 */
