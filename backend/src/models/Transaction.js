import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		title: {
			type: String,
		},
		type: {
			type: String,
			enum: ["income", "expense"],
		},
		projectId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Project",
		},
		date: {
			type: Date,
			required: true,
		},
		category: {
			type: String,
			required: false,
		},
		origin: {
			type: String,
		},
		baseAmount: {
			type: Number,
			required: true,
		},
		taxAmount: {
			type: Number,
			required: true,
		},
		totalAmount: {
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
		frequency: {
			type: String,
			enum: ["weekly", "monthly"],
			required: false,
		},
		attachmentURL: {
			type: String,
		},
		isArchived: {
			type: Boolean,
			default: false,
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
		delete ret.userId;
	},
});
export default mongoose.model("Transaction", TransactionSchema);
