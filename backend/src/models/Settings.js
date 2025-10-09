import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
			unique: true,
		},
		preferences: {
			language: { type: String, default: "en" },

			currency: { type: String, default: "CAD" },

			theme: { type: String, enum: ["light", "dark"], default: "light" },

			notifications: {
				email: { type: Boolean, default: true },
				push: { type: Boolean, default: true },
			},
		},
	},
	{ timestamps: true }
);

SettingsSchema.set("toJSON", {
	virtuals: true,
	versionKey: false,
	transform: (_, ret) => {
		ret.id = ret._id;
		delete ret._id;
	},
});

export default mongoose.model("Settings", SettingsSchema);
