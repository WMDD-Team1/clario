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

const GeneralSettingsSchema = new mongoose.Schema(
	{
		language: { type: String, enum: ["en", "fr"], default: "en" },
		theme: { type: String, enum: ["light", "dark"], default: "light" },
	},
	{ _id: false }
);

const FinanceSettingsSchema = new mongoose.Schema(
	{
		province: {
			type: String,
			enum: ["British Columbia", "Quebec"],
			default: "British Columbia",
		},
		incomeCategories: {
			type: [String],
			default: ["Project Income", "Recurring Income", "Professional Services"],
		},
		expenseCategories: {
			type: [String],
			default: ["Software & Tools", "Equipment & Hardware", "Subscriptions", "Professional Services"],
		},
	},
	{ _id: false }
);

const SettingsSchema = new mongoose.Schema(
	{
		general: { type: GeneralSettingsSchema, default: () => ({}) },
		finance: { type: FinanceSettingsSchema, default: () => ({}) },
	},
	{ _id: false }
);

const UserSchema = new mongoose.Schema(
	{
		email: {
			type: String,
		},
		password: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		address: {
			street: { type: String, default: null },
			postalCode: { type: String, default: null },
			city: { type: String, default: null },
			country: { type: String, default: null },
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
		defaultFeeType: {
			type: String,
			enum: ["Fixed Price", "Milestone Based", "Hourly", "Retainer"],
			default: null,
		},
		goal: {
			type: String,
			enum: ["Keep finances stable", "Grow my business", "Save time", "Stay tax-ready"],
			default: null,
		},
		onBoardingCompletedAt: {
			type: Date,
			default: null,
		},
		settings: { type: SettingsSchema, default: () => ({}) },
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
		delete ret.password;
	},
});

export default mongoose.model("User", UserSchema);
