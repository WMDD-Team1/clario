/**
 * @swagger
 * tags:
 *   name: Milestones
 *   description: API endpoints for managing milestones within projects
 */

/**
 * @swagger
 * /api/projects/{projectId}/milestones:
 *   post:
 *     summary: Create a milestone for a project
 *     description: Add a new milestone (with optional deliverables) to the specified project.
 *     tags: [Milestones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the project
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - amount
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Design Phase"
 *               description:
 *                 type: string
 *                 example: "Wireframes, mockups, and UI designs"
 *               amount:
 *                 type: number
 *                 example: 1500
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-11-01"
 *               generateInvoice:
 *                 type: string
 *                 enum: [on_completion, on_due_date]
 *                 example: "on_completion"
 *     responses:
 *       201:
 *         description: Milestone created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Project not found
 */

/**
 * @swagger
 * /api/projects/{projectId}/milestones/{milestoneId}:
 *   patch:
 *     summary: Update a milestone
 *     tags: [Milestones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: milestoneId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Development Phase"
 *               amount:
 *                 type: number
 *                 example: 2000
 *               dueDate:
 *                 type: string
 *                 example: "2025-12-01"
 *               generateInvoice:
 *                 type: string
 *                 enum: [on_completion, on_due_date]
 *     responses:
 *       200:
 *         description: Milestone updated successfully
 *       404:
 *         description: Milestone not found
 *
 *   delete:
 *     summary: Delete a milestone
 *     tags: [Milestones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: milestoneId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Milestone deleted successfully
 *       404:
 *         description: Milestone not found
 */
