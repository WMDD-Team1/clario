import express from "express";
import { checkJWT } from "../../middlewares/checkJWT.js";
import { attachUser } from "../../middlewares/attachUser.js";
import * as CategoryController from "../../controllers/settings/CategoryController.js";

export const router = express.Router();

router.use(checkJWT);
router.use(attachUser);

router.get("/", CategoryController.getCategories);
router.post("/", CategoryController.createCategory);
router.patch("/:id", CategoryController.updateCategory);
router.delete("/:id", CategoryController.deleteCategory);
