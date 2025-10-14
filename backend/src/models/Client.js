import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
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
		phone: {
			type: String,
			default: null,
		},
		address: {
			street: { type: String },
			postalCode: { type: String },
			city: { type: String },
			country: { type: String },
		},
		notes: {
			type: String,
			maxlength: 500,
			default: null,
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
ClientSchema.virtual("projects", {
	ref: "Project",
	localField: "_id",
	foreignField: "clientId",
	count: true,
});
ClientSchema.virtual("invoices", {
	ref: "Invoice",
	localField: "_id",
	foreignField: "clientId",
	count: true,
});

ClientSchema.set("toJSON", {
	virtuals: true,
	versionKey: false,
	transform: (_, ret) => {
		ret.id = ret._id;
		delete ret._id;
		delete ret.userId;
	},
});

export default mongoose.model("Client", ClientSchema);
