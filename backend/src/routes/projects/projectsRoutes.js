import express from "express";
import * as ProjectController from "../../controllers/projects/ProjectController.js";
import { checkJWT } from "../../middlewares/checkJWT.js";
import { attachUser } from "../../middlewares/attachUser.js";
import multer from "multer";

export const router = express.Router();
const upload = multer();

router.use(checkJWT);
router.use(attachUser);

router.get("/overview", ProjectController.getOverview);
router.get("/", ProjectController.getAllProjects);
router.get("/:id", ProjectController.getProjectById);
router.post("/", upload.single("file"), ProjectController.createProject);
router.patch("/:id", ProjectController.updateProject);

router.patch("/:id/archive", ProjectController.archiveProject);
export default router;
