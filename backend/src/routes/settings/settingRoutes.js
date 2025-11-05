import express from "express";
import * as SettingController from "../../controllers/settings/SettingController.js";
import { checkJWT } from "../../middlewares/checkJWT.js";
import { attachUser } from "../../middlewares/attachUser.js";

export const router = express.Router();

router.use(checkJWT);
router.use(attachUser);

router.patch("/profile", SettingController.updateProfile);
router.patch("/preferences", SettingController.updatePreferences);
router.patch("/finance", SettingController.updateFinanceSettings);
router.get("/", SettingController.getSettings);

router.get("/categories/incomes", SettingController.getIncomeCategories);
router.patch("/categories/incomes", SettingController.updateIncomeCategories);

router.get("/categories/expenses", SettingController.getExpenseCategories);
router.patch("/categories/expenses", SettingController.updateExpenseCategories);

router.get("/export/transactions", SettingController.exportCSV);
