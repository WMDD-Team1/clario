import mongoose from "mongoose";

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
			requried: true,
		},
		clientId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Client",
			requried: true,
		},

		userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		clientName: String,

		milestoneName: String,
		dueDate: Date,
		amount: Number,
		deliverables: [
			{
				name: String,
			},
		],

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
