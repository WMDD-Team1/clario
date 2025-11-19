import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

export const router = express.Router();
router.post("/", async (req, res) => {
	const { name, email, message } = req.body;
	console.log(name);
	try {
		if (!name || !email || !message) {
			return res.status(400).json({ error: "All fields are required" });
		}
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.GMAIL_USER,
				pass: process.env.GMAIL_PASS,
			},
		});
		await transporter.sendMail({
			from: "Clario Contact Form",
			to: process.env.GMAIL_USER,
			subject: `New Contact Message from ${name}`,
			html: `
        <h2>Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
		});

		res.json({ success: true });
	} catch (err) {
		console.error("Contact form error:", err);
		res.status(500).json({ error: "Failed to send message" });
	}
});
