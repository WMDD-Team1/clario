/**
 * @swagger
 * tags:
 *   name: Recurrences
 *   description: API endpoints for managing recurrences for expenses
 */

/**
 * @swagger
 * /api/recurrences:
 *   get:
 *     summary: Get all recurrences
 *     description: Retrieve a list of all recurrences for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     tags: [Recurrences]
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
 *         description: Successfully retrieved list of recurrences
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Recurrence'
 *                 meta:
 *                   $ref: '#/components/schemas/PaginationMeta'
 *       401:
 *         description: Unauthorized (JWT missing or invalid)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/recurrences/{id}:
 *   get:
 *     summary: Get a single recurrence by ID
 *     description: Retrieve detailed information about a specific recurrence.
 *     security:
 *       - bearerAuth: []
 *     tags: [Recurrences]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier for the recurrence
 *     responses:
 *       200:
 *         description: Successfully retrieved recurrence
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recurrence'
 *       404:
 *         description: Recurrence not found
 *       401:
 *         description: Unauthorized (JWT missing or invalid)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/recurrences:
 *   post:
 *     summary: Create a new recurrence
 *     description: Create a new recurrence for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     tags: [Recurrences]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RecurrenceInput'
 *     responses:
 *       201:
 *         description: Successfully created recurrence
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recurrence'
 *       400:
 *         description: Bad request (validation errors)
 *       401:
 *         description: Unauthorized (JWT missing or invalid)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/recurrences/{id}:
 *  patch:
 *    summary: Update an existing recurrence
 *    description: Update details of an existing recurrence by its ID.
 *    security:
 *      - bearerAuth: []
 *    tags: [Recurrences]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: Unique identifier for the recurrence
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/recurrenceInput'
 *    responses:
 *      200:
 *        description: Successfully updated recurrence
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Recurrence'
 *      400:
 *        description: Bad request (validation errors)
 *      404:
 *        description: Recurrence not found
 *      401:
 *        description: Unauthorized (JWT missing or invalid)
 *      500:
 *        description: Internal server error
 */

/**
 * @swagger
 * /api/recurrences/{id}/archive:
 *   patch:
 *     summary: Archive a recurrence
 *     description: Toggle the archived status of a specific recurrence by its ID.
 *     security:
 *       - bearerAuth: []
 *     tags: [Recurrence]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier for the recurrence
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
 *         description: Successfully archived recurrence
 *       404:
 *         description: Recurrence not found
 *       401:
 *         description: Unauthorized (JWT missing or invalid)
 *       500:
 *         description: Internal server error
 */


