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
		country: String,

		contracts: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Contract",
			},
		],
		projects: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Project",
			},
		],
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
