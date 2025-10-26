import express from "express";
import * as SettingController from "../../controllers/settings/SettingController.js";
import * as CategoryController from "../../controllers/settings/CategoryController.js";
import { checkJWT } from "../../middlewares/checkJWT.js";
import { attachUser } from "../../middlewares/attachUser.js";

export const router = express.Router();

router.use(checkJWT);
router.use(attachUser);

router.patch("/profile", SettingController.updateProfile);
router.patch("/preferences", SettingController.updatePreferences);
router.patch("/finance", SettingController.updateFinanceSettings);
router.get("/", SettingController.getSettings);

router.get("/categories", CategoryController.getUserCategories);
router.post("/categories", CategoryController.createUserCategory);
router.patch("/categories/:id", CategoryController.updateUserCategory);
router.delete("/categories/:id", CategoryController.deleteUserCategory);
