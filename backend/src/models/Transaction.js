import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
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
		categoryId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
			required: false,
		},
		origin: {
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
		status: {
			type: String,
			enum: ["Pending", "Paid"],
			default: "Pending",
		},
		paymentDate: {
			type: Date,
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
	},
});
export default mongoose.model("Transaction", TransactionSchema);
