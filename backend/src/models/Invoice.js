import mongoose from "mongoose";
const DeliverableSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
	},
	{ _id: false }
);

const InvoiceSchema = new mongoose.Schema(
	{
		invoiceNumber: {
			type: Number,
			required: true,
			unique: true,
		},
		projectId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Project",
			required: true,
		},
		milestoneId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Project.milestones",
			required: true,
		},
		clientId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Client",
			required: true,
		},

		userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		clientName: String,

		milestoneName: String,
		dueDate: Date,
		amount: Number,
		deliverables: [DeliverableSchema],

		amount: Number,
		taxRate: Number,
		taxAmount: Number,
		totalAmount: Number,

		fileUrl: {
			type: String,
			default: null,
		},

		status: {
			type: String,
			enum: ["Pending", "Paid", "Overdue"],
			default: "Pending",
		},
		sentAt: { type: Date, default: null },
	},
	{
		timestamps: true,
	}
);

InvoiceSchema.set("toJSON", {
	virtuals: true,
	versionKey: false,
	transform: (_, ret) => {
		ret.id = ret._id;
		delete ret._id;
	},
});

export default mongoose.model("Invoice", InvoiceSchema);
