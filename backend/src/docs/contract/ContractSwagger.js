/**
 * @swagger
 * tags:
 *   name: Contracts
 *   description: Upload and analyze contract documents
 */

/**
 * @swagger
 * /api/contracts/contract-upload:
 *   post:
 *     summary: Upload a new contract document
 *     description: Uploads a contract file (PDF or image) to Firebase. If no projectId is provided, the contract will be parsed by AI to extract project information.
 *     tags: [Contracts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/ContractInput'
 *     responses:
 *       201:
 *         description: Contract uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Contract uploaded and parsed successfully.
 *                 projectInput:
 *                   type: object
 *                   description: Parsed project data extracted from contract (only when projectId is not provided)
 *                   properties:
 *                     projectName:
 *                       type: string
 *                       example: "Website Redesign"
 *                     clientName:
 *                       type: string
 *                       example: "ABC Corp"
 *                     description:
 *                       type: string
 *                       example: "Redesigning ABC Corp's website for UX improvement."
 *                     startDate:
 *                       type: string
 *                       format: date
 *                       example: "2025-10-01"
 *                     dueDate:
 *                       type: string
 *                       format: date
 *                       example: "2025-12-31"
 *                     totalBudget:
 *                       type: number
 *                       example: 5000
 *       400:
 *         description: Missing or invalid file
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/contracts/contract-analyze:
 *   post:
 *     summary: Analyze a contract for risky clauses
 *     description: Finds the latest contract associated with the given project and runs AI analysis to identify risky clauses.
 *     tags: [Contracts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - projectId
 *             properties:
 *               projectId:
 *                 type: string
 *                 example: "670a12b4d9e4fa1234abcd56"
 *     responses:
 *       200:
 *         description: Contract analyzed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Contract analyzed successfully
 *                 result:
 *                   $ref: '#/components/schemas/Contract'
 *       400:
 *         description: Missing projectId
 *       404:
 *         description: No contract found for this project
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
