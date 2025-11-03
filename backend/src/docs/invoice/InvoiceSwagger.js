/**
 * @swagger
 * tags:
 *   name: Invoices
 *   description: Manage project invoices automatically generated from milestones or manually created by user.
 */

/**
 * @swagger
 * /api/invoices:
 *   get:
 *     summary: Get all invoices
 *     description: Returns a paginated list of invoices for the authenticated user.
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: projectId
 *         schema:
 *           type: string
 *         description:  Filter invoices by project ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of results per page
 *     responses:
 *       200:
 *         description: Paginated list of invoices
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Invoice'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
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

/**
 * @swagger
 * /api/invoices/{invoiceId}/send:
 *   post:
 *     summary: Send invoice via email
 *     description: Sends the generated invoice PDF to the client’s email using Resend.
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: invoiceId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the invoice to send
 *     responses:
 *       200:
 *         description: Invoice email sent successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Invoice #12 sent to bitna@client.com"
 *               sentAt: "2025-11-02T18:32:00.000Z"
 *       404:
 *         description: Invoice not found
 *       500:
 *         description: Failed to send invoice email
 */
