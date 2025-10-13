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
		contact: {
			type: String,
			default: null,
		},

		address: {
			type: String,
			default: null,
		},
		billingAddress: {
			type: String,
			default: null,
		},
		// align with project schema isArchived :P
		isArchived: {
			type: Boolean,
			default: false,
		},
		description: {
			type: String,
			maxlength: 500,
			default: null,
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
