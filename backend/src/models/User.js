import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
	{
		auth0Id: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		name: {
			type: String,
		},
		profileImage: {
			type: String,
			default: null,
		},
		currency: {
			type: String,
			default: "CAD",
		},
		province: {
			type: String,
			default: null,
		},
		userType: {
			type: String,
			enum: ["Freelancer", "Contractor"],
			default: "Freelancer",
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
	},
});

export default mongoose.model("User", UserSchema);
