import { bucket } from "../config/firebase.js";
import { v4 as uuidv4 } from "uuid";

export const uploadToFirebase = async (file, folder = "contracts/original") => {
	if (!file) throw new Error("No file provided");

	const fileName = `${uuidv4()}-${file.originalname}`;
	const filePath = bucket.file(`${folder}/${fileName}`);
	const fileRef = bucket.file(filePath);

	await fileRef.save(file.buffer, {
		metadata: { contentType: file.mimetype },
		public: true,
	});

	const [url] = await fileRef.getSignedUrl({
		action: "read",
		expires: "03-01-2035",
	});

	return {
		fileName,
		fileUrl: url,
		fileType: file.mimetype.split("/")[1],
		size: file.size,
		path: filePath,
	};
};
