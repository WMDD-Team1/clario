import mongoose from "mongoose";

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
			default: null,
		},
		province: {
			type: String,
		},
		userType: {
			type: String,
			enum: ["Freelancer", "Contractor"],
			default: null,
		},
		onBoardingCompletedAt: {
			type: Date,
			default: null,
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
