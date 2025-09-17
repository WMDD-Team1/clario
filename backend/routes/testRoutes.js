import express from "express";
import { getText } from "../controllers/testController.js";

const router = express.Router();

/**
 * @swagger
 * /api/text:
 *   get:
 *     summary: Get a sample text message
 *     responses:
 *       200:
 *         description: Returns a text message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 text:
 *                   type: string
 *                   example: Hello from backend!
 */
router.get("/test", getText);

export default router;
