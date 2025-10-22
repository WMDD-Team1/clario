import express from "express";
import * as MilestoneController from "../../controllers/projects/MilestoneController.js";
import * as DeliverableController from "../../controllers/projects/DeliverableController.js";
import { checkJWT } from "../../middlewares/checkJWT.js";
import { attachUser } from "../../middlewares/attachUser.js";
import multer from "multer";
const upload = multer();

export const router = express.Router();

router.use(checkJWT);
router.use(attachUser);

// Milestones
router.post("/:projectId/milestones", MilestoneController.createMilestone);
router.patch("/:projectId/milestones/:milestoneId", MilestoneController.updateMilestone);
router.delete("/:projectId/milestones/:milestoneId", MilestoneController.deleteMilestone);

// Deliverables
router.post(
	"/:projectId/milestones/:milestoneId/deliverables",
	upload.single("file"),
	DeliverableController.addDeliverable
);
router.patch(
	"/:projectId/milestones/:milestoneId/deliverables/:deliverableId",
	upload.single("file"),
	DeliverableController.updateDeliverable
);
router.delete(
	"/:projectId/milestones/:milestoneId/deliverables/:deliverableId",
	DeliverableController.deleteDeliverable
);
