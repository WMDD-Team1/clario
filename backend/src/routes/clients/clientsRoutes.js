import express from "express";
import * as ClientController from "../../controllers/clients/ClientController.js";
import { checkJWT } from "../../middlewares/checkJWT.js";
import { attachUser } from "../../middlewares/attachUser.js";

export const router = express.Router();

router.use(checkJWT);
router.use(attachUser);

router.get("/", ClientController.getAllClients);
router.get("/:id", ClientController.getClientById);
router.post("/", ClientController.createClient);
router.patch("/:id", ClientController.updateClient);
router.patch("/:id/archive", ClientController.archiveClient);

export default router;
