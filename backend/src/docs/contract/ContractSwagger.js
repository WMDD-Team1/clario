/**
 * @swagger
 * tags:
 *   name: Contracts
 *   description: Upload, analyze, and generate contract documents
 */

/**
 * @swagger
 * /api/contracts/upload:
 *   post:
 *     summary: Upload a contract (linked to a project or standalone)
 *     description: Upload a contract file.
 *       - If `projectId` is provided, it will be linked to that project.
 *       - If `projectId` is not provided, the system will parse and extract project information using AI.
 *     tags: [Contracts]
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
 *               projectId:
 *                 type: string
 *                 nullable: true
 *                 description: Optional project ID to link this contract
 *                 example: "671a5b2345abcde98765f123"
 *               clientId:
 *                 type: string
 *                 nullable: true
 *                 description: Optional client ID if not parsed from file
 *                 example: "671a5b2345abcde98765f456"
 *     responses:
 *       201:
 *         description: Contract uploaded successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Contract uploaded and parsed successfully."
 *               projectInput:
 *                 name: "Website Redesign"
 *                 totalBudget: 5000
 *                 dueDate: "2025-12-31"
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/contracts/analyze/{projectId}:
 *   post:
 *     summary: Analyze uploaded contract for risky clauses
 *     description: Perform AI-based clause risk analysis for a specific project's uploaded contract.
 *     tags: [Contracts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the project whose contract should be analyzed
 *     responses:
 *       200:
 *         description: Contract analyzed successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Contract analyzed successfully"
 *               result:
 *                 contractId: "671a1234bcdef9876543210"
 *                 aiAnalysis:
 *                   riskyClauses:
 *                     - paragraph: "Client may terminate this contract at any time without notice."
 *                       category: "Termination"
 *                       riskLevel: "High"
 *                       reason: "No notice period or compensation specified upon termination."
 *       400:
 *         description: Missing or invalid projectId
 *       404:
 *         description: Contract not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/contracts/draft/{projectId}:
 *   post:
 *     summary: Generate a draft contract from project details
 *     description: Creates a draft contract PDF for a specific project using stored project and client information.
 *     tags: [Contracts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: The project ID to generate a draft contract for
 *     responses:
 *       201:
 *         description: Draft contract generated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Draft contract generated successfully"
 *               contract:
 *                 id: "671a1234bcdef9876543210"
 *                 contractUrl: "https://storage.googleapis.com/contracts/drafts/website-redesign.pdf"
 *                 fileType: "pdf"
 *                 size: 254876
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal Server Error
 */
