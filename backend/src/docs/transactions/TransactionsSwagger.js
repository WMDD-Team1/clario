/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: API endpoints for managing transactions (incomes and expenses)
 */

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get all transactions
 *     description: Retrieve a list of all transactions for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     tags: [Transactions]
 *     parameters:
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
 *         description: Number of projects per page
 *     responses:
 *       200:
 *         description: Successfully retrieved list of transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Transaction'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       description: Total number of transactions retrieved
 *                     page:
 *                       type: integer
 *                       description: Current page number
 *                     limit:
 *                       type: integer
 *                       description: Number of transactions per page
 *                     totalPages:
 *                       type: integer
 *                       description: Total number of pages available
 *       401:
 *         description: Unauthorized (JWT missing or invalid)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/transactions/{id}:
 *   get:
 *     summary: Get a single transaction by ID
 *     description: Retrieve detailed information about a specific transaction.
 *     security:
 *       - bearerAuth: []
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier for the transaction
 *     responses:
 *       200:
 *         description: Successfully retrieved transaction
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: Transaction not found
 *       401:
 *         description: Unauthorized (JWT missing or invalid)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Create a new transaction
 *     description: Create a new transaction (income or expense) for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransactionInput'
 *     responses:
 *       201:
 *         description: Successfully created transaction
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: Bad request (validation errors)
 *       401:
 *         description: Unauthorized (JWT missing or invalid)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/transactions/scan:
 *   post:
 *     summary: Scan and upload a transaction
 *     description: Receives a file upload it to firebase and scan it to find transaction fields
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Contract file to upload (PDF, JPG, PNG)
 *     responses:
 *       201:
 *         description: Transaction uploaded successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Transaction uploaded and parsed successfully."
 *               transaction:
 *                 title: "Website Redesign"
 *                 date: "2025-12-31"
 *                 origin: "INV-001"
 *                 baseAmount: 100
 *                 notes: "Invoice example"
 *               fileUrl: "https://img.com"
 * 
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/transactions/{id}:
 *  patch:
 *    summary: Update an existing transaction
 *    description: Update details of an existing transaction by its ID.
 *    security:
 *      - bearerAuth: []
 *    tags: [Transactions]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: Unique identifier for the transaction
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/TransactionInput'
 *    responses:
 *      200:
 *        description: Successfully updated transaction
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Transaction'
 *      400:
 *        description: Bad request (validation errors)
 *      404:
 *        description: Transaction not found
 *      401:
 *        description: Unauthorized (JWT missing or invalid)
 *      500:
 *        description: Internal server error
 */

/**
 * @swagger
 * /api/transactions/{id}/archive:
 *   patch:
 *     summary: Archive a transaction
 *     description: Toggle the archived status of a specific transaction by its ID.
 *     security:
 *       - bearerAuth: []
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier for the transaction
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isArchived:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Successfully archived transaction
 *       404:
 *         description: Transaction not found
 *       401:
 *         description: Unauthorized (JWT missing or invalid)
 *       500:
 *         description: Internal server error
 */


