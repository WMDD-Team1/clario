import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		type: {
			type: String,
			enum: ["Individual", "Company"],
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		phone: String,
		address: String,
		billingAddress: {
			type: String,
			default: null,
		},

		country: String,

		taxId: {
			type: String,
			default: null,
		},
		preferredPaymentMethod: {
			type: String,
			enum: ["Bank Transfer", "Credit/Debit Card", "PayPal", "Other"],
			default: "Bank Transfer",
		},

		status: {
			type: String,
			enum: ["active", "inactive"],
			default: "active",
		},

		notes: {
			type: String,
			maxlength: 200,
			default: null,
		},
	},

	{
		timestamps: true,
	}
);

ClientSchema.set("toJSON", {
	virtuals: true,
	versionKey: false,
	transform: (_, ret) => {
		ret.id = ret._id;
		delete ret._id;
	},
});

export default mongoose.model("Client", ClientSchema);
