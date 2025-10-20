import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		clientId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Client",
			required: true,
		},

		name: {
			type: String,
			required: true,
		},
		type: {
			type: String,
		},

		description: String,
		fee: {
			type: Number,
		},
		feeType: {
			type: String,
			enum: ["milestone", "deliverable", "fixed", "subscription", "hourly"],
		},
		taxable: {
			type: Boolean,
			default: false,
		},
		color: {
			type: String,
			// may need default hex?
		},

		status: {
			type: String,
			enum: ["planned", "in-progress", "completed", "cancelled"],
			default: "planned",
		},
		isArchived: {
			type: Boolean,
			default: false,
		},

		startDate: Date,
		endDate: Date,
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
