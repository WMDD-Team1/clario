import express from "express";
import multer from "multer";
import { TransactionController } from "../../controllers/index.js";
import { attachUser } from "../../middlewares/attachUser.js";
import { checkJWT } from "../../middlewares/checkJWT.js";

export const router = express.Router();

const upload = multer();

router.use(checkJWT);
router.use(attachUser);
router.get("/", TransactionController.getAll);
router.get("/:id", TransactionController.getById);
router.post("/", TransactionController.create);
router.post("/scan", upload.single("file"), TransactionController.scanAndUpload);
router.patch("/:id", TransactionController.update);
router.patch("/:id/archive", TransactionController.archive);

export default router;