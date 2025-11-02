import { bucket } from "../config/firebase.js";
import { v4 as uuidv4 } from "uuid";

export const uploadToFirebase = async (file, folder = "contracts/original") => {
	if (!file) throw new Error("No file provided");

	const fileName = `${uuidv4()}-${file.originalname}`;
	const filePath = `${folder}/${fileName}`;
	const fileRef = bucket.file(filePath);

	await fileRef.save(file.buffer, {
		resumable: false,
		metadata: { contentType: file.mimetype },
		public: true,
	});

	const [url] = await fileRef.getSignedUrl({
		action: "read",
		expires: "03-01-2035",
	});

	const fileType = file.mimetype.split("/")[1];

	return {
		fileName,
		fileUrl: url,
		fileType: fileType,
		size: file.size,
		path: filePath,
	};
};

export const deleteFromFirebase = async (fileUrl) => {
	if (!fileUrl) return;

	const match = fileUrl.match(/\/o\/([^?]+)/);
	if (!match || !match[1]) throw new Error("Invalid Firebase URL");

	const filePath = decodeURIComponent(match[1]);
	const fileRef = bucket.file(filePath);

	await fileRef.delete({ ignoreNotFound: true });
	return true;
};
