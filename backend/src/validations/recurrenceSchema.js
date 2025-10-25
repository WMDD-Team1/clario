import { z } from "zod";
import mongoose from "mongoose";

const objectIdSchema = z
    .string()
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: "Invalid ObjectId format",
    });

export const recurrenceSchema = z.object({
    frequency: z.enum(["weekly", "monthly"], {
        required_error: "frequency is required",
    }),
    templateTransactionId: objectIdSchema,
    endDate: z.coerce.date({ required_error: "endDate is required" }),
})