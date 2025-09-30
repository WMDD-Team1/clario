import mongoose from "mongoose";

const ContractSchema = new mongoose.Schema(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
		projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
		contractUrl: String,
		totalAmount: Number,
		paymentTerms: String,
		deliveryDate: Date,
		aiAnalysis: {
			riskyClauses: [String],
			suggestions: [String],
		},
	},
	{
		timestamps: true,
	}
);

ContractSchema.set("toJSON", {
	virtuals: true,
	versionKey: false,
	transform: (_, ret) => {
		ret.id = ret._id;
		delete ret._id;
	},
});

export default mongoose.model("Contract", ContractSchema);
