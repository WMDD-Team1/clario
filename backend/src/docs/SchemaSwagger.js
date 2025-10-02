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
