import express from "express";
import sgMail from "@sendgrid/mail";

export const router = express.Router();
router.post("/", async (req, res) => {
	const { name, email, message } = req.body;

	try {
		if (!name || !email || !message) {
			return res.status(400).json({ error: "All fields are required" });
		}

		const msg = {
			to: process.env.CONTACT_RECEIVER_EMAIL,
			from: process.env.SENDGRID_SENDER_EMAIL,
			subject: `New Contact Message from ${name}`,
			html: `
				<h2>Contact Form Submission</h2>
				<p><strong>Name:</strong> ${name}</p>
				<p><strong>Email:</strong> ${email}</p>
				<p><strong>Message:</strong> ${message}</p>
			`,
		};

		await sgMail.send(msg);

		return res.json({ success: true });
	} catch (error) {
		console.error("SendGrid Contact Error:", error);
		return res.status(500).json({ error: "Failed to send message" });
	}
});
