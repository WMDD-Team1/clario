const deliverableSchema = new mongoose.Schema(
	{
		projectId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Project",
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		fileUrl: {
			type: String,
		},
		size: Number, //max 50MB
		uploadedAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Deliverable", deliverableSchema);
