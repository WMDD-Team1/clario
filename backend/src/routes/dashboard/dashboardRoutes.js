import express from "express";
import * as DashboardController from "../../controllers/dashboard/DashboardController.js";
import { checkJWT } from "../../middlewares/checkJWT.js";
import { attachUser } from "../../middlewares/attachUser.js";

export const router = express.Router();

router.use(checkJWT);
router.use(attachUser);

router.get("/reminders", DashboardController.getReminders);
