import express from "express";
import * as ProjectController from "../../controllers/ProjectController.js";

export const router = express.Router();

router.get("/", ProjectController.getAllProjects);
router.get("/:id", ProjectController.getProjectById);
router.post("/", ProjectController.createProject);
router.put("/:id", ProjectController.updateProject);
router.delete("/:id", ProjectController.deleteProject);

router.patch("/:id/archive", ProjectController.toggleArchive);
export default router;
