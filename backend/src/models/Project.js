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
			enum: ["Planned", "in-progress", "completed", "cancelled"],
			default: "Planned",
		},
		isArchived: {
			type: Boolean,
			default: false,
		},

		startDate: Date,
		endDate: Date,

		// Invoice schedule
		recurrence: {
			type: {
				type: String,
				enum: ["none", "weekly", "monthly", "yearly", "custom"],
				default: "none",
			},
			interval: { type: Number, default: 1 },
			occurrences: { type: Number, default: null },
			endDate: { type: Date, default: null },
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
