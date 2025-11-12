import mongoose from "mongoose";

const RecurrenceSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        templateTransactionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transaction",
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
		frequency: {
			type: String,
			enum: ["weekly", "monthly"],
		},
        lastRun: {
            type: Date,
        },
        nextRun: {
            type: Date,
        },
        isArchived: {
            type: Boolean,
            default: false,
        }
    }
);

RecurrenceSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
    },
})

export default mongoose.model("Recurrence", RecurrenceSchema)