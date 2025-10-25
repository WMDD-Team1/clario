import express from "express";
import { RecurrenceController } from "../../controllers/index.js";
import { checkJWT } from "../../middlewares/checkJWT.js";
import { attachUser } from "../../middlewares/attachUser.js";

export const router = express.Router();

router.use(checkJWT);
router.use(attachUser);
router.get("/", RecurrenceController.getAll);
router.get("/:id", RecurrenceController.getById);
router.post("/", RecurrenceController.create);
router.patch("/:id", RecurrenceController.update);
router.patch("/:id/archive", RecurrenceController.archive);

export default router;