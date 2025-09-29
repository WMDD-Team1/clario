import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
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
		},
		type: {
			type: String,
			enum: ["income", "expense"],
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		currency: {
			type: String,
			default: "CAD",
		},
		description: {
			type: String,
			required: false,
		},
		date: {
			type: Date,
			required: true,
		},
		receiptUrl: {
			type: String,
			required: false,
		},
		status: {
			type: String,
			enum: ["pending", "paid", "overdue"],
			default: "pending",
		},
		ocrText: {
			type: String,
			required: false,
		},
		metadata: {
			type: mongoose.Schema.Types.Mixed,
			required: false,
		},
	},
	{
		timestamps: true,
	}
);

TransactionSchema.set("toJSON", {
	virtuals: true,
	versionKey: false,
	transform: (_, ret) => {
		ret.id = ret._id;
		delete ret._id;
	},
});
export default mongoose.model("Transaction", TransactionSchema);
