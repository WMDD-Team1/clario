import express from "express";
import * as ClientController from "../../controllers/clients/ClientController.js";
import { checkJWT } from "../../middlewares/checkJWT.js";

export const router = express.Router();

// router.use(checkJWT);
router.get("/", ClientController.getAllClients);
router.get("/:id", ClientController.getClientById);
router.post("/", ClientController.createClient);
router.put("/:id", ClientController.updateClient);
router.patch("/:id/archive", ClientController.archiveClient);

export default router;
