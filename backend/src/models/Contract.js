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
		displayName: {
			type: String,
		},
		contractUrl: String,
		fileType: {
			type: String,
			enum: ["pdf", "png", "jpeg", "jpg"],
		},
		size: { type: Number, max: 5 * 1024 * 1024 },

		totalAmount: Number,
		paymentTerms: String,
		upfrontAmount: { type: Number, default: 0 },
		milestones: [
			{
				name: String,
				amount: Number,
				dueDate: Date,
			},
		],
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
