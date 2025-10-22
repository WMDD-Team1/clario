import express from "express";
import * as InvoiceController from "../../controllers/invoice/InvoiceController.js";
import { checkJWT } from "../../middlewares/checkJWT.js";
import { attachUser } from "../../middlewares/attachUser.js";

export const router = express.Router();

router.use(checkJWT);
router.use(attachUser);

router.post("/", InvoiceController.createInvoice);
router.get("/", InvoiceController.getInvoices);
router.get("/:invoiceId", InvoiceController.getInvoiceById);
router.patch("/:invoiceId/status", InvoiceController.updateInvoiceStatus);
