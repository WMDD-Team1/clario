/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: API endpoints for managing clients and their related projects
 */

/**
 * @swagger
 * /api/clients:
 *   get:
 *     summary: Get all clients
 *     description: Returns clients with search, sort, filter, and pagination.
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *         description: Search by name, email, phone, or country
 *       - in: query
 *         name: sortBy
 *         schema: { type: string, enum: [name, projectCount, invoiceCount], default: name }
 *       - in: query
 *         name: sortOrder
 *         schema: { type: string, enum: [asc, desc], default: asc }
 *       - in: query
 *         name: viewType
 *         schema: { type: string, enum: [all, active, archived], default: all }
 *     responses:
 *       200:
 *         description: Successfully retrieved clients
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Client'
 *                 meta:
 *                   $ref: '#/components/schemas/PaginationMeta'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/clients/{id}:
 *   get:
 *     summary: Get client details
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Successfully retrieved client
 *       404:
 *         description: Client not found
 */

/**
 * @swagger
 * /api/clients:
 *   post:
 *     summary: Create a new client
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClientInput'
 *     responses:
 *       201:
 *         description: Client created successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /api/clients/{id}:
 *   patch:
 *     summary: Update a client
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClientInput'
 *     responses:
 *       200:
 *         description: Client updated successfully
 *       404:
 *         description: Client not found
 */

/**
 * @swagger
 * /api/clients/{id}/archive:
 *   patch:
 *     summary: Archive / unarchive a client
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isArchived: { type: boolean, example: true }
 *     responses:
 *       200:
 *         description: Client archive status updated
 *       404:
 *         description: Client not found
 */
