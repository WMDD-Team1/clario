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
