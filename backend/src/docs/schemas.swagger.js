/**
 * @swagger
 * components:
 *   schemas:
 *     Signup:
 *       type: object
 *       properties:
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
 *         profileImage:
 *           type: string
 *           example: null
 *           nullable: true
 *         province:
 *           type: string
 *           example: null
 *           nullable: true
 *         currency:
 *           type: string
 *           example: null
 *           nullable: true
 *         onBoardingCompletedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: null
 *       required: [email, name]
 *
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
 *         profileImage:
 *           type: string
 *           example: null
 *           nullable: true
 *         province:
 *           type: string
 *           example: null
 *           nullable: true
 *         currency:
 *           type: string
 *           example: null
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