/**
 * @swagger
 * tags:
 *   name: Invoices
 *   description: Manage project invoices automatically generated from milestones or manually created by user.
 */

/**
 * @swagger
 * /api/invoices/{projectId}:
 *   get:
 *     summary: Get all invoices for a specific project
 *     description: Retrieves all invoices belonging to the given project.
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the project
 *     responses:
 *       200:
 *         description: Successfully retrieved invoices
 *         content:
 *           application/json:
 *             example:
 *               - id: "671a1234bcdef9876543210"
 *                 invoiceNumber: 102
 *                 milestoneName: "UI Design"
 *                 amount: 1200
 *                 totalAmount: 1260
 *                 status: "Pending"
 *                 fileUrl: "https://storage.googleapis.com/invoices/invoice_102.pdf"
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
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
 * /api/invoices/{invoiceId}:
 *   get:
 *     summary: Get an invoice by ID
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: invoiceId
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
 * /api/invoices/{invoiceId}/status:
 *   patch:
 *     summary: Update invoice payment status
 *     description: Updates invoice status to Paid or Pending. If set to Paid, triggers income transaction creation.
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: invoiceId
 *         required: true
 *         schema:
 *           type: string
 *         description: Invoice ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Pending, Paid]
 *                 example: Paid
 *     responses:
 *       200:
 *         description: Invoice status updated successfully and income triggered if applicable
 *         content:
 *           application/json:
 *             example:
 *               message: "Invoice status updated"
 *               result:
 *                 id: "671a1234bcdef9876543210"
 *                 invoiceNumber: 102
 *                 status: "Paid"
 *                 totalAmount: 1260
 *       404:
 *         description: Invoice not found
 *       401:
 *         description: Unauthorized
 */
