import express from "express";
import * as ProjectController from "../../controllers/projects/ProjectController.js";
import { checkJWT } from "../../middlewares/checkJWT.js";
import { attachUser } from "../../middlewares/attachUser.js";

export const router = express.Router();

router.use(checkJWT);
router.use(attachUser);

router.get("/", ProjectController.getAllProjects);
router.get("/:id", ProjectController.getProjectById);
router.post("/", ProjectController.createProject);
router.patch("/:id", ProjectController.updateProject);

router.patch("/:id/archive", ProjectController.archiveProject);
export default router;
