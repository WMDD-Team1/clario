import cron from "node-cron";
import Project from "../models/Project.js";
import User from "../models/User.js";
import { createInvoiceService } from "../services/invoice/InvoiceService.js";

cron.schedule("0 0 * * *", async () => {
	try {
		const today = new Date();
		const start = new Date(today);
		start.setHours(0, 0, 0, 0);
		const end = new Date(today);
		end.setHours(23, 59, 59, 999);

		const projects = await Project.find({
			"milestones.generateInvoice": "on_due_date",
			"milestones.dueDate": { $gte: start, $lte: end },
		});

		for (const project of projects) {
			const user = await User.findById(project.userId).lean();

			let updated = false;

			for (const milestone of project.milestones) {
				if (
					milestone.generateInvoice === "on_due_date" &&
					milestone.dueDate >= start &&
					milestone.dueDate <= end &&
					!milestone.invoiceId
				) {
					const invoice = await createInvoiceService(user, project._id, milestone._id);

					milestone.invoicedAt = new Date();
					milestone.invoiceId = invoice._id;
					updated = true;

					console.log(`[CRON] Invoice generated for project ${project._id} → milestone ${milestone.name}`);
				}
			}

			if (updated) await project.save();
		}

		console.log("[CRON] Daily invoice generation completed");
	} catch (err) {
		console.error("[CRON ERROR]", err);
	}
});
