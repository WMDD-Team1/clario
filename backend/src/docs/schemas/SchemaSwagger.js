/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 650d1e4f5d1234567890abcd
 *         email:
 *           type: string
 *           example: bitna@test.com
 *         name:
 *           type: string
 *           example: Bitna Lee
 *         userType:
 *           type: string
 *           enum: [Freelancer, Contractor]
 *           nullable: true
 *           example: null
 *         picture:
 *           type: string
 *           example: https://cdn.auth0.com/avatars/bi.png
 *           nullable: true
 *         province:
 *           type: string
 *           example: BC
 *           nullable: true
 *         currency:
 *           type: string
 *           example: CAD
 *           nullable: true
 *         onBoardingCompletedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: null
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-09-25T12:34:56.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-09-25T12:34:56.000Z
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the client
 *           example: 670a12b4d9e4fa1234abcd56
 *         name:
 *           type: string
 *           example: "Sarah Thompson"
 *         email:
 *           type: string
 *           example: "sarah@ecobuild.com"
 *         phone:
 *           type: string
 *           example: "+1 (604) 219-8457"
 *         address:
 *           type: object
 *           properties:
 *             street:
 *               type: string
 *               example: "123 Main St"
 *             postalCode:
 *               type: string
 *               example: "V5K 1A1"
 *             city:
 *               type: string
 *               example: "Vancouver"
 *             country:
 *               type: string
 *               example: "Canada"
 *         notes:
 *           type: string
 *           example: "Referred by Kentaro"
 *         isArchived:
 *           type: boolean
 *           description: Whether the client is archived (true = hidden, false = visible)
 *           example: false
 *         projectCount:
 *           type: integer
 *           example: 3
 *         invoiceCount:
 *           type: integer
 *           example: 2
 *         projects:
 *           type: array
 *           description: List of related projects (only returned in GET /api/clients/{id})
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 example: "670b24c3a9e0fd3456cde789"
 *               name:
 *                 type: string
 *                 example: "Freelancer Dashboard Redesign"
 *               isArchived:
 *                 type: boolean
 *                 example: false
 *         invoices:
 *           type: array
 *           description: List of related invoices (only returned in GET /api/clients/{id})
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 example: "671b91f4a22beae1d9d1b789"
 *               totalAmount:
 *                 type: number
 *                 example: 2400
 *               status:
 *                 type: string
 *                 example: "Paid"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-10-05T12:34:56.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-10-05T12:34:56.000Z
 *
 *     ClientInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           example: "Me The Best"
 *         email:
 *           type: string
 *           example: "bitna@client.com"
 *         phone:
 *           type: string
 *           example: "16045551212"
 *         address:
 *           type: object
 *           properties:
 *             street:
 *               type: string
 *               example: "456 Commercial Dr"
 *             postalCode:
 *               type: string
 *               example: "V5K 1A1"
 *             city:
 *               type: string
 *               example: "Vancouver"
 *             country:
 *               type: string
 *               example: "Canada"
 *         notes:
 *           type: string
 *           example: "Regular client"
 *         isArchived:
 *           type: boolean
 *           example: false
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 671a5b2345abcde98765f123
 *         name:
 *           type: string
 *           example: "Website Redesign"
 *         description:
 *           type: string
 *           example: "Redesigning client’s e-commerce platform."
 *         client:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             name:
 *               type: string
 *           example:
 *             id: "671a5b2345abcde98765f123"
 *             name: "Me The Best"
 *         type:
 *           type: string
 *           example: "Web Development"
 *         totalBudget:
 *           type: number
 *           example: 8000
 *         upfrontAmount:
 *           type: number
 *           example: 1500
 *           description: Initial upfront payment amount, if any
 *         status:
 *           type: string
 *           enum: [Planning, In-Progress, Review, Done]
 *           example: "In-Progress"
 *         isActive:
 *           type: boolean
 *           example: true
 *         isArchived:
 *           type: boolean
 *           example: false
 *         startDate:
 *           type: string
 *           format: date
 *           example: "2025-10-01"
 *         dueDate:
 *           type: string
 *           format: date
 *           example: "2025-12-31"
 *         milestonesCount:
 *           type: integer
 *           example: 3
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-09-25T12:34:56.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-10-01T09:42:31.000Z"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the transaction
 *           example: 670a12b4d9e4fa1234abcd56
 *         projectId:
 *           type: string
 *           description: Linked project ID
 *           example: "670a12b4d9e4fa1234abcd99"
 *         type:
 *           type: string
 *           enum: [income, expense]
 *           example: "expense"
 *         title:
 *           type: string
 *           example: "Internet payment"
 *         date:
 *           type: string
 *           format: date
 *           example: 2025-10-05
 *         category:
 *           type: string
 *           description: Linked category
 *           example: "670a12b4d9e4fa1234abcd99"
 *         amount:
 *           type: number
 *           example: 200
 *         origin:
 *           type: string
 *           example: "Freelancer payment"
 *         paymentMethod:
 *           type: string
 *           example: "Credit Card"
 *         notes:
 *           type: string
 *           maxLength: 200
 *           example: "Payment for October (max 200 characters)"
 *         recurrence:
 *           type: string
 *           enum: [weekly, monthly]
 *           example: "weekly"
 *         attachmentURL:
 *           type: string
 *           format: uri
 *           example: "https://example.com/attachment.pdf"
 *         isArchived:
 *           type: boolean
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-10-05T12:34:56.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-10-05T12:34:56.000Z
 *
 *     TransactionInput:
 *       type: object
 *       required:
 *         - type
 *         - date
 *         - category
 *         - amount
 *         - origin
 *       properties:
 *         projectId:
 *           type: string
 *           example: "670a12b4d9e4fa1234abcd99"
 *         type:
 *           type: string
 *           enum: [income, expense]
 *           example: "expense"
 *         title:
 *           type: string
 *           example: "Internet payment"
 *         date:
 *           type: string
 *           format: date
 *           example: 2025-10-05
 *         category:
 *           type: string
 *           example: "670a12b4d9e4fa1234abcd99"
 *         amount:
 *           type: number
 *           example: 200
 *         origin:
 *           type: string
 *           example: "Freelancer payment"
 *         paymentMethod:
 *           type: string
 *           example: "Credit Card"
 *         notes:
 *           type: string
 *           maxLength: 200
 *           example: "Payment for October (max 200 characters)"
 *         attachmentURL:
 *           type: string
 *           format: uri
 *           example: "https://example.com/attachment.pdf"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TransactionInsight:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Insight title
 *           example: Upcoming Income Expected
 *         text:
 *           type: string
 *           description: Insight text
 *           example: You have an incoming payment of $500 from invoice INV-003 expected to be received this month.
 *         month:
 *           type: string
 *           enum: [This Month, Next Month]
 *           example: "This Month"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Invoice:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 671a1234bcdef9876543210
 *         invoiceNumber:
 *           type: integer
 *           example: 102
 *         clientName:
 *           type: string
 *           example: "Me The Best"
 *         milestoneName:
 *           type: string
 *           example: "UI Design"
 *         dueDate:
 *           type: string
 *           format: date
 *           example: "2025-11-18"
 *         amount:
 *           type: number
 *           example: 1200
 *         taxAmount:
 *           type: number
 *           example: 60
 *         totalAmount:
 *           type: number
 *           example: 1260
 *         fileUrl:
 *           type: string
 *           format: url
 *           example: "https://storage.googleapis.com/invoices/invoice_102.pdf"
 *         status:
 *           type: string
 *           enum: [Pending, Paid, Overdue]
 *           example: "Pending"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Contract:
 *       type: object
 *       description: Represents a contract document uploaded or generated for a project
 *       properties:
 *         id:
 *           type: string
 *           example: 671a1234bcdef9876543210
 *         userId:
 *           type: string
 *           description: Linked user ID (contract owner)
 *           example: 68e7fece77529efa3742ba6e
 *         clientId:
 *           type: string
 *           nullable: true
 *           description: Linked client ID if available
 *           example: 690690a20e01bd957b22a951
 *         projectId:
 *           type: string
 *           nullable: true
 *           description: Linked project ID if the contract is attached to one
 *           example: 6906946206f472ca6c4e16db
 *         contractName:
 *           type: string
 *           description: Machine-safe contract file name (no spaces)
 *           example: Website_Redesign-draft-contract.pdf
 *         displayName:
 *           type: string
 *           description: Human-readable name for UI display
 *           example: Website Redesign (Draft Contract)
 *         contractUrl:
 *           type: string
 *           format: uri
 *           description: Public URL for the uploaded or generated contract
 *           example: https://storage.googleapis.com/contracts/drafts/Website_Redesign-draft-contract.pdf
 *         fileType:
 *           type: string
 *           enum: [pdf, png, jpg, jpeg]
 *           example: pdf
 *         size:
 *           type: number
 *           example: 65432
 *         totalAmount:
 *           type: number
 *           example: 5000
 *         upfrontAmount:
 *           type: number
 *           example: 1500
 *           description: Amount or percentage paid upfront
 *         paymentTerms:
 *           type: string
 *           example: Payment due within 30 days after invoice submission.
 *         milestones:
 *           type: array
 *           description: List of milestones included in this contract
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Design Phase
 *               amount:
 *                 type: number
 *                 example: 1200
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: 2025-12-15
 *         deliveryDate:
 *           type: string
 *           format: date
 *           example: 2025-12-31
 *         aiAnalysis:
 *           type: object
 *           description: AI-generated contract clause risk analysis
 *           properties:
 *             summary:
 *               type: string
 *               example: "Found 3 risky clauses (1 high risk)."
 *             riskyClauses:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RiskyClause'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-11-02T00:13:30.404Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-11-02T00:13:30.404Z
 *
 *     RiskyClause:
 *       type: object
 *       description: Represents a clause identified by AI as potentially risky
 *       properties:
 *         paragraph:
 *           type: string
 *           example: "Client may terminate this contract at any time without notice."
 *         category:
 *           type: string
 *           enum: [Payment Terms, Timeline, Termination, Intellectual Property, Revisions, Confidentiality, Other]
 *           example: Termination
 *         riskLevel:
 *           type: string
 *           enum: [Low, Medium, High]
 *           example: High
 *         reason:
 *           type: string
 *           example: "No notice period or compensation specified upon termination."
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PaginationMeta:
 *       type: object
 *       properties:
 *         total:
 *           type: integer
 *           example: 42
 *           description: Total number of items
 *         page:
 *           type: integer
 *           example: 1
 *           description: Current page number
 *         limit:
 *           type: integer
 *           example: 10
 *           description: Number of items per page
 *         totalPages:
 *           type: integer
 *           example: 5
 *           description: Total number of pages
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Recurrence:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the recurrence
 *           example: 670a12b4d9e4fa1234abcd56
 *         templateTransactionId:
 *           type: string
 *           description: Recurrent expense ID
 *           example: "670a12b4d9e4fa1234abcd99"
 *         frequency:
 *           type: string
 *           enum: [weekly, monthly]
 *           example: "monthly"
 *         endDate:
 *           type: string
 *           format: date
 *           example: 2025-10-05
 *         lastRun:
 *           type: string
 *           format: date
 *           example: 2025-10-05
 *         nextRun:
 *           type: string
 *           format: date
 *           example: 2025-10-05
 *         isArchived:
 *           type: boolean
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-10-05T12:34:56.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-10-05T12:34:56.000Z
 *
 *     RecurrenceInput:
 *       type: object
 *       required:
 *         - templateTransactionId
 *         - frequency
 *         - endDate
 *       properties:
 *         templateTransactionId:
 *           type: string
 *           description: Recurrent expense ID
 *           example: "670a12b4d9e4fa1234abcd99"
 *         frequency:
 *           type: string
 *           enum: [weekly, monthly]
 *           example: "monthly"
 *         endDate:
 *           type: string
 *           format: date
 *           example: 2025-10-05
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Deliverable:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         files:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               fileUrl:
 *                 type: string
 *               fileType:
 *                 type: string
 *               size:
 *                 type: number
 *               uploadedAt:
 *                 type: string
 *                 format: date-time
 *         dueDate:
 *           type: string
 *           format: date
 *         status:
 *           type: string
 *           enum: [Pending, Completed]

 *     Milestone:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         amount:
 *           type: number
 *         dueDate:
 *           type: string
 *           format: date
 *         isArchived:
 *           type: boolean
 *         generateInvoice:
 *           type: string
 *           enum: [on_completion, on_due_date]
 *         deliverables:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Deliverable'
 */
