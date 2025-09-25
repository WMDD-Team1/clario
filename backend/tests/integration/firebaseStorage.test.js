import { bucket } from "../../src/config/firebase.js";

test("Firebase Storage Connected", async () => {
	const [metadata] = await bucket.getMetadata();
	expect(metadata).toBeDefined();
	expect(metadata.id).toContain(process.env.FIREBASE_BUCKET);
});
