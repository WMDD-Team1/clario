import express from "express";
import {TransactionController} from "../../controllers/index.js";
import { checkJWT } from "../../middlewares/checkJWT.js";

export const router = express.Router();

router.get("/", checkJWT, TransactionController.getAll);

export default router;