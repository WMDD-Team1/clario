import express from "express";
import * as ContractController from "../../controllers/contract/ContractController.js";
import { checkJWT } from "../../middlewares/checkJWT.js";
import { attachUser } from "../../middlewares/attachUser.js";
import multer from "multer";

export const router = express.Router();

const upload = multer();

router.use(checkJWT);
router.use(attachUser);

router.post("/upload", upload.single("file"), ContractController.uploadContract);
router.post("/analyze/:projectId", ContractController.analyzeContract);
router.post("/draft/:projectId", ContractController.generateContract);
