import mongoose from "mongoose";
import { z } from "zod";

export const transactionSchema = z.object({
    type: z.enum(["income", "expense"], {
        required_error: "Transaction type is required",
    }),
    projectId: z.string()
        .refine((val) => mongoose.Types.ObjectId.isValid(val), {
            message: "Invalid projectId",
        }).optional(),
    date: z.coerce.date({ required_error: "Date is required" }),
    categoryId: z.string()
        .refine((val) => mongoose.Types.ObjectId.isValid(val), {
            message: "Invalid categoryId",
        }).optional(),
    origin: z.string().min(1, "Origin cannot be empty"),
    baseAmount: z.number({
        required_error: "Amount is required",
        invalid_type_error: "Amount must be a number",
    }),
    paymentMethod: z.string().optional(),
    notes: z.string().max(200, "Notes cannot exceed 200 characters").optional(),
    attachmentURL: z.url("Invalid URL").optional(),
}).strict();