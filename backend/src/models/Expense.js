import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		projectId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Project",
			required: true,
		},
		categoryId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
			required: false,
		},
		payeeName: {
			type: String,
			required: true,
		},
		receiptNumber: {
			type: String,
		},
		amount: {
			type: Number,
			required: true,
		},
		currency: {
			type: String,
			default: "CAD",
		},
		taxable: {
			type: Boolean,
			default: false,
		},
		paymentMethod: {
			type: String,
		},
		notes: {
			type: String,
			maxlength: 200,
		},
		receiptUrl: {
			type: String,
		},
		date: {
			type: Date,
			required: true,
		},
	},
	{ timestamps: true }
);

ExpenseSchema.set("toJSON", {
	virtuals: true,
	versionKey: false,
	transform: (_, ret) => {
		ret.id = ret._id;
		delete ret._id;
	},
});

export default mongoose.model("Expense", ExpenseSchema);
