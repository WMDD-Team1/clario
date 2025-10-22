/**
 * @swagger
 * tags:
 *   name: Invoices
 *   description: API endpoints for managing invoices
 */

/**
 * @swagger
 * /api/invoices/{projectId}/{milestoneId}:
 *   post:
 *     summary: Generate an invoice for a milestone
 *     description: Creates a new invoice for the specified milestone, generates a PDF, and uploads it to Firebase Storage.
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *           example: 670a12b4d9e4fa1234abcd56
 *         description: The ID of the project
 *       - in: path
 *         name: milestoneId
 *         required: true
 *         schema:
 *           type: string
 *           example: 670a12b4d9e4fa1234abcd99
 *         description: The ID of the milestone to invoice
 *     responses:
 *       201:
 *         description: Invoice created successfully and uploaded to Firebase
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invoice created successfully"
 *                 invoice:
 *                   $ref: '#/components/schemas/Invoice'
 *       404:
 *         description: Project or milestone not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/invoices:
 *   get:
 *     summary: Get all invoices
 *     description: Retrieve a list of invoices belonging to the authenticated user.
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved invoices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Invoice'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/invoices/{id}:
 *   get:
 *     summary: Get an invoice by ID
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Invoice retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 *       404:
 *         description: Invoice not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/invoices/{id}/download:
 *   get:
 *     summary: Download invoice PDF
 *     description: Returns the Firebase file URL for the invoice PDF.
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Invoice ID
 *     responses:
 *       200:
 *         description: Successfully returned file URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fileUrl:
 *                   type: string
 *                   example: "https://storage.googleapis.com/.../invoice_12.pdf"
 *       404:
 *         description: Invoice not found
 */
