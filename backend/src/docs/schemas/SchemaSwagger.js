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
 *           example: "Bitna Corporation"
 *         type:
 *           type: string
 *           enum: [Individual, Company]
 *           example: "Individual"
 *         email:
 *           type: string
 *           example: "bitna@methebest.com"
 *         contact:
 *           type: string
 *           example: "+1 (236) 123-1234"
 *         address:
 *           type: string
 *           example: "123 Main St, Vancouver, BC"
 *         billingAddress:
 *           type: string
 *           example: "123 Main St, Vancouver, BC"
 *         isArchived:
 *           type: boolean
 *           description: Whether the client is archived (true = hidden, false = visible)
 *           example: false
 *         description:
 *           type: string
 *           example: "Kentaro recommended"
 *         projectCount:
 *           type: integer
 *           example: 3
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
 *         - type
 *       properties:
 *         name:
 *           type: string
 *           example: "Me The Best"
 *         type:
 *           type: string
 *           enum: [Individual, Company]
 *           example: "Company"
 *         email:
 *           type: string
 *           example: "bitna@client.com"
 *         contact:
 *           type: string
 *           example: "+1 604-555-1212"
 *         address:
 *           type: string
 *           example: "456 Commercial Dr, Vancouver"
 *         description:
 *           type: string
 *           example: "Regular client"
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
 *           description: Unique identifier for the project
 *           example: 670a12b4d9e4fa1234abcd56
 *         userId:
 *           type: string
 *           description: Auth0 user ID associated with this project
 *           example: "auth0|68e7ff990c803370d5016be2"
 *         clientId:
 *           type: string
 *           description: Linked client ID
 *           example: "670a12b4d9e4fa1234abcd99"
 *         name:
 *           type: string
 *           example: "Smart Document AI Assistant"
 *         type:
 *           type: string
 *           example: "Web Application"
 *         description:
 *           type: string
 *           example: "End-to-end assistant for freelancers' contract and finance tracking"
 *         fee:
 *           type: number
 *           example: 1200
 *         feeType:
 *           type: string
 *           enum: [milestone, deliverable, fixed, subscription, hourly]
 *           example: "fixed"
 *         taxable:
 *           type: boolean
 *           example: true
 *         color:
 *           type: string
 *           example: "#369FFF"
 *         status:
 *           type: string
 *           enum: [planned, in-progress, completed, cancelled]
 *           example: "in-progress"
 *         isArchived:
 *           type: boolean
 *           description: Whether the project is archived
 *           example: false
 *         startDate:
 *           type: string
 *           format: date
 *           example: 2025-10-01
 *         endDate:
 *           type: string
 *           format: date
 *           example: 2025-12-31
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-10-05T12:34:56.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-10-05T12:34:56.000Z
 *
 *     ProjectInput:
 *       type: object
 *       required:
 *         - name
 *         - clientId
 *       properties:
 *         name:
 *           type: string
 *           example: "Clario Project"
 *         clientId:
 *           type: string
 *           example: "670a12b4d9e4fa1234abcd99"
 *         type:
 *           type: string
 *           example: "Web Development"
 *         description:
 *           type: string
 *           example: "Internal tool for automating freelancer contracts and invoicing."
 *         fee:
 *           type: number
 *           example: 1200
 *         feeType:
 *           type: string
 *           enum: [milestone, deliverable, fixed, subscription, hourly]
 *           example: "fixed"
 *         taxable:
 *           type: boolean
 *           example: true
 *         color:
 *           type: string
 *           example: "#ff0505"
 *         status:
 *           type: string
 *           enum: [planned, in-progress, completed, cancelled]
 *           example: "planned"
 *         startDate:
 *           type: string
 *           format: date
 *           example: 2025-10-01
 *         endDate:
 *           type: string
 *           format: date
 *           example: 2025-12-31
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