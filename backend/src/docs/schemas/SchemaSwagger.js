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
 *           example: 670a12b4d9e4fa1234abcd56
 *         name:
 *           type: string
 *           example: "Bitna Corporation"
 *         type:
 *           type: string
 *           enum: [Individual, Company]
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
 *         status:
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
