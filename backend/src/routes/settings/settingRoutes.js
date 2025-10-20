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
router.get("/", SettingController.getUserSettings);
