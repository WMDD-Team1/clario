import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		type: { type: String, enum: ["income", "expense"], required: true },
	},
	{ _id: true }
);
CategorySchema.set("toJSON", {
	virtuals: true,
	versionKey: false,
	transform: (_, ret) => {
		ret.id = ret._id;
		delete ret._id;
	},
});

const UserSchema = new mongoose.Schema(
	{
		auth0Id: {
			type: String,
			require: true,
			unique: true,
		},
		email: {
			type: String,
		},
		name: {
			type: String,
			required: true,
		},
		picture: { type: String },
		currency: {
			type: String,
			default: "CAD",
		},
		province: {
			type: String,
		},
		userType: {
			type: String,
			enum: ["Freelancer", "Contractor", "Developer", "Designer", "Consultant", "Other"],
			default: null,
		},
		defaultFeeType: { type: String, enum: ["Fixed price", "Milestone based", "Hourly", "Retainer"], default: null },
		goal: {
			type: String,
			enum: [" Keep finances stable", "Grow my business", "Save time", "Stay tax-ready"],
			default: null,
		},
		onBoardingCompletedAt: {
			type: Date,
			default: null,
		},
		settings: {
			general: {
				language: {
					type: String,
					enum: ["en", "fr"],
					default: "en",
				},
				theme: {
					type: String,
					enum: ["light", "dark"],
					default: "light",
				},
			},
			finance: {
				province: {
					type: String,
					enum: ["British Columbia", "Quebec"],
					default: "British Columbia",
				},
				categories: { type: [CategorySchema], default: [] },
			},
		},
	},
	{
		timestamps: true,
	}
);

UserSchema.set("toJSON", {
	virtuals: true,
	versionKey: false,
	transform: (_, ret) => {
		ret.id = ret._id;
		delete ret._id;
		delete ret.auth0Id;
	},
});

export default mongoose.model("User", UserSchema);
