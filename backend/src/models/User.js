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
			require: true,
		},
		onBoardingCompletedAt: Date,
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
	},
});

export default mongoose.model("User", UserSchema);
