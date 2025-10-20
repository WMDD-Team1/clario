import express from "express";
import { getTransactionsInsights } from "../../controllers/openai/OpenAIController.js";
import { attachUser } from "../../middlewares/attachUser.js";
import { checkJWT } from "../../middlewares/checkJWT.js";

export const router = express.Router();

router.use(checkJWT);
router.use(attachUser);
router.post("/transactions", getTransactionsInsights);

export default router;