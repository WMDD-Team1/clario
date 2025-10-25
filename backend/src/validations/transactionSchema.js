import { z } from "zod";
import mongoose from "mongoose";

const objectIdSchema = z
    .string()
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: "Invalid ObjectId format",
    });

export const transactionSchema = z.object({
    type: z.enum(["income", "expense"], {
        required_error: "Transaction type is required",
    }),
    projectId: objectIdSchema.optional(),
    date: z.coerce.date({ required_error: "Date is required" }),
    categoryId: objectIdSchema.optional(),
    origin: z.string().min(1, "Origin cannot be empty"),
    baseAmount: z.number({
        required_error: "Amount is required",
        invalid_type_error: "Amount must be a number",
    }),
    paymentMethod: z.string().optional(),
    notes: z.string().max(200, "Notes cannot exceed 200 characters").optional(),
    status: z.enum(["pending", "paid"]).default("pending"),
    paymentDate: z.coerce.date().optional(),
    attachmentURL: z.url("Invalid URL").optional(),
})