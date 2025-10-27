import express from "express";
import {
	getReminders,
	getOverview,
	getCurrentMonthIncome,
	getTopExpenses,
	getMoneyFlow,
} from "../../controllers/dashboard/DashboardController.js";
import { checkJWT } from "../../middlewares/checkJWT.js";
import { attachUser } from "../../middlewares/attachUser.js";

export const router = express.Router();

router.use(checkJWT);
router.use(attachUser);

router.get("/reminders", getReminders);
router.get("/overview", getOverview);
router.get("/current", getCurrentMonthIncome);
router.get("/top-expenses", getTopExpenses);
router.get("/money-flow", getMoneyFlow);
