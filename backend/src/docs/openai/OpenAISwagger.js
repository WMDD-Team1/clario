/**
 * @swagger
 * tags:
 *   name: OpenAI
 *   description: API endpoints for AI based request
 */

/**
 * @swagger
 * /api//ai/transactions:
 *   post:
 *     summary: Insights based user transactions
 *     description: This year transactions will be sent to ChatGPT to analysis and 5 insights will be returned
 *     security:
 *       - bearerAuth: []
 *     tags: [OpenAI]
 *     parameters:
 *     responses:
 *       200:
 *         description: Successfully retrieved list of insights
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TransactionInsight'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       description: Total number of insights retrieved
 *                       example: 5
 *       400:
 *         description: Error getting insights from OpenAI
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Label that can be showed to users
 *                 error:
 *                   type: string
 *                   description: AI response explaining what happened
 *       401:
 *         description: Unauthorized (JWT missing or invalid)
 *       500:
 *         description: Internal server error
 */
