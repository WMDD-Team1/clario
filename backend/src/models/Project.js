import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		clientId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Client",
			required: true,
		},
		contractId: { type: mongoose.Schema.Types.ObjectId, ref: "Contract" },
		title: {
			type: String,
			required: true,
		},
		description: String,
		startDate: Date,
		endDate: Date,
		status: {
			type: String,
			enum: ["Planned", "in-progress", "completed", "cancelled"],
			default: "Planned",
		},
	},
	{
		timestamps: true,
	}
);

ProjectSchema.set("toJSON", {
	virtuals: true,
	versionKey: false,
	transform: (_, ret) => {
		ret.id = ret._id;
		delete ret._id;
	},
});
export default mongoose.model("Project", ProjectSchema);
