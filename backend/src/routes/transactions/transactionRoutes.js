import express from "express";
import { TransactionController } from "../../controllers/index.js";
import { checkJWT } from "../../middlewares/checkJWT.js";

export const router = express.Router();

router.use(checkJWT)
router.get("/", TransactionController.getAll);
router.get("/:id", TransactionController.getById);

export default router;