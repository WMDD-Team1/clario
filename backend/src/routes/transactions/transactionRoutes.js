import express from "express";
import { TransactionController } from "../../controllers/index.js";
import { checkJWT } from "../../middlewares/checkJWT.js";
import { attachUser } from "../../middlewares/attachUser.js";

export const router = express.Router();

router.use(checkJWT);
router.use(attachUser);
router.get("/", TransactionController.getAll);
router.get("/:id", TransactionController.getById);
router.post("/", TransactionController.create);
router.patch("/:id", TransactionController.update);
router.patch("/:id/archive", TransactionController.archive);

export default router;