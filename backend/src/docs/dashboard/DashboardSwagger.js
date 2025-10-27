/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Endpoints for user dashboard insights and reminders
 */

/**
 * @swagger
 * /api/dashboard/reminders:
 *   get:
 *     summary: Get upcoming deliverable reminders
 *     description: Returns a list of deliverables whose due dates are approaching within a given time range.
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: days
 *         schema:
 *           type: integer
 *           default: 7
 *         description: Number of days ahead to check for deliverables due
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Current page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of reminders per page
 *     responses:
 *       200:
 *         description: Successfully retrieved paginated deliverable reminders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       projectId:
 *                         type: string
 *                         example: "68f905a85b172898eadea040"
 *                       milestoneId:
 *                         type: string
 *                         example: "68f905e15b172898eadea049"
 *                       deliverableId:
 *                         type: string
 *                         example: "68f905e15b172898eadea111"
 *                       deliverableName:
 *                         type: string
 *                         example: "Final UI Mockups"
 *                       milestoneName:
 *                         type: string
 *                         example: "Design Phase"
 *                       clientName:
 *                         type: string
 *                         example: "Me The Best"
 *                       dueDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-11-05T00:00:00.000Z"
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 25
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     totalPages:
 *                       type: integer
 *                       example: 3
 *                     hasNextPage:
 *                       type: boolean
 *                       example: true
 */

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard overview and insights
 */

/**
 * @swagger
 * /api/dashboard/overview:
 *   get:
 *     summary: Get user's financial overview for the dashboard
 *     description: |
 *       Returns the summary of user's financial data including:
 *       - total income and expenses
 *       - total taxes
 *       - recurring incomes and recurring expenses
 *       Uses both **Transaction** and **Recurrence** collections.
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved overview data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DashboardOverview'
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard analytics and summaries
 */

/**
 * @swagger
 * /api/dashboard/current:
 *   get:
 *     summary: Get current month's income and expense totals
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current month's totals
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 income:
 *                   type: number
 *                   example: 12000
 *                 expense:
 *                   type: number
 *                   example: 8000
 */
/**
 * @swagger
 * /api/dashboard/top-expenses:
 *   get:
 *     summary: Get top 4 highest expenses
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved top 4 expenses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: "Office Rent"
 *                       amount:
 *                         type: number
 *                         example: 2500
 *                       category:
 *                         type: string
 *                         example: "Rent"
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-10-03T00:00:00Z"
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *                       example: 4
 */
/**
 * @swagger
 * /api/dashboard/money-flow:
 *   get:
 *     summary: Get 6-month income and expense trend data
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved 6-month income and expense data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       month:
 *                         type: string
 *                         example: "2025-10"
 *                       income:
 *                         type: number
 *                         example: 12000
 *                       expense:
 *                         type: number
 *                         example: 8000
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *                       example: 6
 *                     range:
 *                       type: object
 *                       properties:
 *                         start:
 *                           type: string
 *                           example: "2025-05"
 *                         end:
 *                           type: string
 *                           example: "2025-10"
 */
