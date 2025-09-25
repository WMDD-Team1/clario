import admin from "firebase-admin";
import "dotenv/config";

const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY, FIREBASE_BUCKET } = process.env;

const serviceAccount = {
	projectId: FIREBASE_PROJECT_ID,
	clientEmail: FIREBASE_CLIENT_EMAIL,
	privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
};

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	storageBucket: FIREBASE_BUCKET,
});

export const bucket = admin.storage().bucket();
