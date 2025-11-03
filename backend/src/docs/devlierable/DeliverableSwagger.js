/**
 * @swagger
 * tags:
 *   name: Deliverables
 *   description: Manage milestone deliverables — upload, view, update, and delete files.
 */

/**
 * @swagger
 * /api/projects/{projectId}/milestones/{milestoneId}/deliverables:
 *   post:
 *     summary: Add a deliverable to a milestone
 *     description: Upload a new deliverable with optional file (PDF or image). Each milestone supports up to 5 deliverables, and each file must be ≤ 5 MB.
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
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Homepage Design"
 *               description:
 *                 type: string
 *                 example: "Responsive homepage layout"
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-10-25"
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: "File to upload (PDF, PNG, JPG, JPEG)"
 *     responses:
 *       201:
 *         description: Deliverable added successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Deliverable added successfully"
 *               deliverable:
 *                 id: "6906aa21cbfbc74c693bab2c"
 *                 name: "Homepage Design"
 *                 description: "Responsive homepage layout"
 *                 files:
 *                   - fileUrl: "https://storage.googleapis.com/deliverables/homepage_design.pdf"
 *                     fileType: "pdf"
 *                     size: 34000
 *                 dueDate: "2025-10-25T00:00:00.000Z"
 *                 status: "Pending"
 *       400:
 *         description: Invalid file type or size exceeded
 *       404:
 *         description: Milestone not found
 */

/**
 * @swagger
 * /api/projects/{projectId}/milestones/{milestoneId}/deliverables/{deliverableId}:
 *   get:
 *     summary: Get a single deliverable by ID
 *     description: Retrieve deliverable details, including file metadata and download URLs.
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
 *         description: Deliverable retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Deliverable retrieved successfully"
 *               deliverable:
 *                 id: "6906aa21cbfbc74c693bab2c"
 *                 name: "Homepage Design"
 *                 description: "Responsive homepage layout"
 *                 files:
 *                   - fileUrl: "https://storage.googleapis.com/deliverables/homepage_design.pdf"
 *                     fileType: "pdf"
 *                     size: 34000
 *                     uploadedAt: "2025-10-25T00:00:00.000Z"
 *                 dueDate: "2025-10-25T00:00:00.000Z"
 *                 status: "Pending"
 *       404:
 *         description: Deliverable not found
 */

/**
 * @swagger
 * /api/projects/{projectId}/milestones/{milestoneId}/deliverables/{deliverableId}:
 *   patch:
 *     summary: Update a deliverable
 *     description: Update deliverable metadata or add additional files. Supports uploading multiple files (up to 5 total per deliverable).
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Homepage Final Design"
 *               description:
 *                 type: string
 *                 example: "Updated layout and branding"
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-11-01"
 *               status:
 *                 type: string
 *                 enum: [Pending, Completed]
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: "Upload an additional file (max 5 total)"
 *     responses:
 *       200:
 *         description: Deliverable updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Deliverable updated successfully"
 *               deliverable:
 *                 id: "6906aa21cbfbc74c693bab2c"
 *                 name: "Homepage Final Design"
 *                 files:
 *                   - fileUrl: "https://storage.googleapis.com/deliverables/homepage_final.pdf"
 *                     fileType: "pdf"
 *                     size: 36000
 *                 dueDate: "2025-11-01T00:00:00.000Z"
 *                 status: "Completed"
 *       404:
 *         description: Deliverable not found
 */

/**
 * @swagger
 * /api/projects/{projectId}/milestones/{milestoneId}/deliverables/{deliverableId}:
 *   delete:
 *     summary: Delete a deliverable or its attached file
 *     description: If `fileId` query param is provided, deletes a single file; otherwise, deletes the entire deliverable and all files.
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
 *       - in: query
 *         name: fileId
 *         schema:
 *           type: string
 *         required: false
 *         description: Optional file ID for deleting a single file
 *     responses:
 *       200:
 *         description: Deliverable or file deleted successfully
 *       404:
 *         description: Deliverable not found
 */
