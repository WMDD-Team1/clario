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
 *         updatedAt:
 *           type: string
 *           format: date-time
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
 *         date:
 *           type: string
 *           format: date
 *           example: 2025-10-05
 *         categoryId:
 *           type: string
 *           description: Linked category ID
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
 *         status:
 *           type: string
 *           enum: [pending, paid]
 *           example: "paid"
 *         paymentDate:
 *           type: string
 *           format: date
 *           example: 2025-10-05
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
 *         - categoryId
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
 *         date:
 *           type: string
 *           format: date
 *           example: 2025-10-05
 *         categoryId:
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
 *         status:
 *           type: string
 *           enum: [pending, paid]
 *           example: "paid"
 *         paymentDate:
 *           type: string
 *           format: date
 *           example: 2025-10-05
 *         attachmentURL:
 *           type: string
 *           format: uri
 *           example: "https://example.com/attachment.pdf"
 *         isArchived:
 *           type: boolean
 *           example: false
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
