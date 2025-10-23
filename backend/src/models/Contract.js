import mongoose from "mongoose";

const RiskClauseSchema = new mongoose.Schema(
	{
		paragraph: String,
		category: String,
		riskLevel: {
			type: String,
			enum: ["Low", "Medium", "High"],
		},
		reason: String,
	},
	{ _id: false }
);

const ContractSchema = new mongoose.Schema(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
		projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },

		contractName: {
			type: String,
		},
		contractUrl: String,
		fileType: {
			type: String,
			enum: ["pdf", "docx", "doc"],
		},
		size: Number, // 50MB max

		totalAmount: Number,
		paymentTerms: String,
		deliveryDate: Date,
		aiAnalysis: {
			riskyClauses: [RiskClauseSchema],
			summary: {
				type: String,
			},
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
