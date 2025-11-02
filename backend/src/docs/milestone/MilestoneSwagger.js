/**
 * @swagger
 * tags:
 *   name: Milestones
 *   description: Manage project milestones — creation, updates, completion, and archival.
 */

/**
 * @swagger
 * /api/projects/{projectId}/milestones/{milestoneId}:
 *   get:
 *     summary: Get milestone by ID
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
 *         description: Milestone retrieved successfully
 *       404:
 *         description: Milestone not found
 */

/**
 * @swagger
 * /api/projects/{projectId}/milestones:
 *   post:
 *     summary: Create a milestone for a project
 *     tags: [Milestones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
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
 *                 example: "Wireframes and UI design"
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
 *       404:
 *         description: Project not found
 */

/**
 * @swagger
 * /api/projects/{projectId}/milestones/{milestoneId}:
 *   patch:
 *     summary: Update a milestone
 *     description: Update milestone details or mark it as completed. If completed and set to generate invoice, an invoice will be created.
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
 *               amount:
 *                 type: number
 *               dueDate:
 *                 type: string
 *                 format: date
 *               generateInvoice:
 *                 type: string
 *                 enum: [on_completion, on_due_date]
 *     responses:
 *       200:
 *         description: Milestone updated successfully
 *       404:
 *         description: Milestone not found
 */

/**
 * @swagger
 * /api/projects/{projectId}/milestones/{milestoneId}/archive:
 *   patch:
 *     summary: Archive or restore a milestone
 *     description: Toggles a milestone’s archived state (instead of deleting it).
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
 *         description: Milestone archived or restored successfully
 *       404:
 *         description: Milestone not found
 */
