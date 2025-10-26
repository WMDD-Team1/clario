/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Endpoints for user dashboard insights and reminders
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Reminder:
 *       type: object
 *       properties:
 *         projectId:
 *           type: string
 *           example: "671b0f5f5c4a2b2c9d831f12"
 *         milestoneId:
 *           type: string
 *           example: "671b0f7a5c4a2b2c9d831f33"
 *         milestoneName:
 *           type: string
 *           example: "Website Launch"
 *         clientName:
 *           type: string
 *           example: "NorthFace"
 *         dueDate:
 *           type: string
 *           format: date-time
 *           example: "2025-10-28T00:00:00.000Z"
 *
 *     ReminderListResponse:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/Reminder'
 */

/**
 * @swagger
 * /api/dashboard/reminders:
 *   get:
 *     summary: Get upcoming milestone reminders for the logged-in user
 *     description: |
 *       Returns a list of upcoming milestones (due soon) across all user projects.
 *       Optionally, you can filter reminders by specifying how many days ahead to look (default is 7 days).
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: days
 *         schema:
 *           type: integer
 *           default: 7
 *         description: Number of days ahead to include milestones
 *     responses:
 *       200:
 *         description: Successfully retrieved reminders
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReminderListResponse'
 *       401:
 *         description: Unauthorized — Invalid or missing token
 *       500:
 *         description: Internal server error
 */
