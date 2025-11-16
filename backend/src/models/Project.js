import mongoose from "mongoose";

const FileSchema = new mongoose.Schema(
	{
		fileUrl: { type: String },
		fileType: { type: String, enum: ["pdf", "png", "jpeg", "jpg"] },
		size: { type: Number, max: 5 * 1024 * 1024 },
		uploadedAt: { type: Date, default: Date.now },
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

const DeliverableSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		description: { type: String },
		files: [FileSchema],
		dueDate: { type: Date },
		status: {
			type: String,
			enum: ["Pending", "Completed"],
			default: "Pending",
		},
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
		isCompleted: {
			type: Boolean,
			default: false,
		},
		completedAt: { type: Date, default: null },

		isArchived: {
			type: Boolean,
			default: false,
		},
		generateInvoice: {
			type: String,
			enum: ["on_completion", "on_due_date"],
			default: "on_completion",
		},

		invoiceId: { type: mongoose.Schema.Types.ObjectId, ref: "Invoice", default: null },
		invoicedAt: { type: Date, default: null },
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
		upfrontAmount: { type: Number, default: 0 },
		amountTotal: {
			type: Number,
			default: 0,
		},

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
	},
});
export default mongoose.model("Project", ProjectSchema);
