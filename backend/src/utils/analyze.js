import { openai } from "../config/openai.js";

export const analyzeContractText = async (text) => {
	const prompt = `
                You are a contract risk analyzer for freelancers.
                Identify clauses that may disadvantage the freelancer.
                Return a JSON array where each item has:
                {
                "paragraph": "<risky clause or sentence>",
                "category": "Payment Terms | Timeline | Termination | Intellectual Property | Revisions | Confidentiality | Other",
                "riskLevel": "Low | Medium | High",
                "reason": "Brief explanation why it is risky"
                }

                Only return valid JSON. No additional commentary.

                Contract text:
                ${text.slice(0, 12000)}
                `;

	const res = await openai.chat.completions.create({
		model: "gpt-4o",
		messages: [{ role: "user", content: prompt }],
		temperature: 0.2,
	});

	const raw = res.choices[0].message.content.trim();
	try {
		return JSON.parse(raw);
	} catch {
		const match = raw.match(/\[[\s\S]*\]/);
		return match ? JSON.parse(match[0]) : [];
	}
};
