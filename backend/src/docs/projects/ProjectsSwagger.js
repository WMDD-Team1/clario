/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Manage user projects and their associated clients, milestones, and deliverables.
 */
/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects with search, filter, and sort
 *     description: Retrieve all projects for the authenticated user, with support for filtering, searching, and sorting.
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: viewType
 *         schema:
 *           type: string
 *           enum: [All, Active, Archived]
 *         description: Filter projects by current tab (All, Active, Archived)
 *         example: All
 *
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by project or client name
 *         example: ""
 *
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [All, Planning, In-Progress, Review, Done]
 *           description: Filter projects by current status
 *           example: All
 *
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [createdAt, startDate, dueDate, totalBudget, milestonesCount]
 *         description: Field to sort by (Date Started, Due Date, Amount, Milestones)
 *         example: dueDate
 *
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order (ascending or descending)
 *         example: desc
 *
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *         example: 1
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *         example: 10
 *
 *     responses:
 *       200:
 *         description: Successfully retrieved projects
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create a new project
 *     description: Creates a new project for the authenticated user. Each project must be linked to an existing client.
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - clientId
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Website Redesign"
 *               description:
 *                 type: string
 *                 example: "Redesigning the client's e-commerce platform with improved UX."
 *               clientId:
 *                 type: string
 *                 example: "671a5b2345abcde98765f123"
 *               type:
 *                 type: string
 *                 example: "Web Development"
 *               totalBudget:
 *                 type: number
 *                 example: 8000
 *               upfrontAmount:
 *                 type: number
 *                 example: 1500
 *                 description: Initial upfront payment amount (if any)
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-11-01"
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2026-01-31"
 *               status:
 *                 type: string
 *                 enum: [Planning, In-Progress, Review, Done]
 *                 example: "Planning"
 *     responses:
 *       201:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Get a single project by ID
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Project retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Project not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/projects/{id}:
 *   patch:
 *     summary: Update a project by ID
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "671a5b2345abcde98765f123"
 *         description: The project ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Website Redesign"
 *               description:
 *                 type: string
 *                 example: "Added mobile-first approach and redefined deliverables."
 *               totalBudget:
 *                 type: number
 *                 example: 6000
 *               status:
 *                 type: string
 *                 enum: [Planning, In-Progress, Review, Done]
 *                 example: "In-Progress"
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Project updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Project not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/projects/{id}/archive:
 *   patch:
 *     summary: Archive or unarchive a project
 *     description: Toggles the `isArchived` field of the project.
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [isArchived]
 *             properties:
 *               isArchived:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Project archived/unarchived successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Project archived successfully."
 *                 project:
 *                   $ref: '#/components/schemas/Project'
 *       404:
 *         description: Project not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/projects/overview:
 *   get:
 *     summary: Get project and client overview metrics
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Summary of project and client stats
 *         content:
 *           application/json:
 *             example:
 *               totalProjects: 8
 *               activeProjects: 5
 *               inactiveProjects: 2
 *               archivedProjects: 1
 *               totalClients: 4
 *               totalBudget: 42000
 *               activeBudget: 33000
 */
