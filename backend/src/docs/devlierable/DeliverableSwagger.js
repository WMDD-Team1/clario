/**
 * @swagger
 * tags:
 *   name: Deliverables
 *   description: API endpoints for managing deliverables within milestones
 */

/**
 * @swagger
 * /api/projects/{projectId}/milestones/{milestoneId}/deliverables:
 *   post:
 *     summary: Add a deliverable to a milestone
 *     tags: [Deliverables]
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
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Homepage Design"
 *               description:
 *                 type: string
 *                 example: "Responsive homepage layout"
 *               fileUrl:
 *                 type: string
 *                 format: url
 *                 example: "https://storage.googleapis.com/files/homepage_design.pdf"
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-10-25"
 *     responses:
 *       201:
 *         description: Deliverable added successfully
 *       404:
 *         description: Milestone not found
 */

/**
 * @swagger
 * /api/projects/{projectId}/milestones/{milestoneId}/deliverables/{deliverableId}:
 *   patch:
 *     summary: Update a deliverable
 *     tags: [Deliverables]
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
 *       - in: path
 *         name: deliverableId
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
 *                 example: "Updated Homepage Design"
 *               description:
 *                 type: string
 *                 example: "Added new brand assets"
 *               fileUrl:
 *                 type: string
 *                 format: url
 *                 example: "https://storage.googleapis.com/files/updated_homepage.pdf"
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-11-01"
 *     responses:
 *       200:
 *         description: Deliverable updated successfully
 *
 *   delete:
 *     summary: Delete a deliverable
 *     tags: [Deliverables]
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
 *       - in: path
 *         name: deliverableId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deliverable deleted successfully
 *       404:
 *         description: Deliverable not found
 */
