import mongoose from "mongoose";

const DeliverableSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		description: { type: String },
		fileUrl: { type: String, default: null },
		dueDate: { type: Date },
	},
	{
		_id: true,
		toJSON: {
			virtuals: true,
			transform: (_, ret) => {
				ret.id = ret._id;
				delete ret._id;
				return ret;
			},
		},
	}
);
const MilestoneSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		description: { type: String },
		amount: { type: Number, required: true },
		dueDate: { type: Date },
		generateInvoice: {
			type: String,
			enum: ["on_completion", "on_due_date"],
			default: "on_completion",
		},
		deliverables: [DeliverableSchema],
	},
	{
		_id: true,
		toJSON: {
			virtuals: true,
			transform: (_, ret) => {
				ret.id = ret._id;
				delete ret._id;
				return ret;
			},
		},
	}
);

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
		description: String,

		type: {
			type: String,
		},

		totalBudget: { type: Number },

		status: {
			type: String,
			enum: ["Planning", "In-Progress", "Review", "Done"],
			default: "Planning",
		},
		isActive: {
			type: Boolean,
			default: false,
		},
		isArchived: {
			type: Boolean,
			default: false,
		},

		startDate: Date,
		dueDate: Date,
		milestones: [MilestoneSchema],
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

		if (ret.clientId && typeof ret.clientId === "object") {
			ret.client = {
				id: ret.clientId._id?.toString() || ret.clientId.id,
				name: ret.clientId.name,
			};
			delete ret.clientId;
		}

		return ret;
	},
});
export default mongoose.model("Project", ProjectSchema);
