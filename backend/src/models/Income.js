import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		projectId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Project",
		},
		contractId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Contract",
			required: false,
		},

		date: {
			type: Date,
			required: true,
		},
		categoryId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
			required: false,
		},
		invoiceNumber: {
			type: String,
		},
		amount: {
			type: Number,
			required: true,
		},
		paymentMethod: {
			type: String,
		},
		notes: {
			type: String,
			maxlength: 200,
			required: false,
		},
		taxable: {
			type: Boolean,
			default: false,
		},
		status: {
			type: String,
			enum: ["Draft", "Pending", "Paid", "Overdue"],
			default: "Pending",
		},

		recurrence: {
			type: {
				type: String,
				enum: ["one-time", "weekly", "monthly", "custom"],
				default: "one-time",
			},
			occurrences: { type: Number, default: 1 },
		},
	},
	{
		timestamps: true,
	}
);

incomeSchema.set("toJSON", {
	virtuals: true,
	versionKey: false,
	transform: (_, ret) => {
		ret.id = ret._id;
		delete ret._id;
	},
});
export default mongoose.model("Income", incomeSchema);
