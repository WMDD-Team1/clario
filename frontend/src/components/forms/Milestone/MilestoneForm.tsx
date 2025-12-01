import { createMilestone, MilestoneApiResponse, updateMilestone } from "@/api";
import Input from "@components/Input";
import Loader from "@components/Loader";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import FormFooter from "../FormFooter";
import { useState } from "react";
import SuccessForm from "../SuccessForm";
import TextArea from "@components/TextArea";
import { Select } from "@mui/material";
import SelectInput from "@components/SelectInput";

// Validation schema
const milestoneSchema = z.object({
    name: z.string().min(3, "Milestone name is required"),
    dueDate: z.string().nonempty("Due date required"),
    amount: z.number().positive("Amount must be greater than 0"),
    description: z.string().max(200, "Description can have up to 200 characters"),
    generateInvoice: z.string()
}).refine(
    (data) => data.generateInvoice === 'on_completion' || data.generateInvoice === 'on_due_date',
    {
        error: "Not valid option",
        path: ["generateInvoice"]
    }
)

const GENERATE_INVOICE_OPTIONS = [
    { label: "On Completion", value: "on_completion" },
    { label: "On Due Date", value: "on_due_date" },
];

type MilestoneFormData = z.infer<typeof milestoneSchema>;

interface Props {
    onCancel: () => void;
    milestone?: MilestoneApiResponse | null;
    projectId: string;
}

export default function ProjectForm({ onCancel, milestone, projectId }: Props) {
    const queryClient = useQueryClient();
    const [isSuccess, setIsSuccess] = useState(false);

    const isEditMode = !!milestone;
    const defaultValues = isEditMode ? {
        name: milestone.name,
        dueDate: milestone.dueDate.split("T")[0],
        amount: milestone.amount,
        description: milestone.description,
        generateInvoice: milestone.generateInvoice,
    } : {
        name: "",
        description: "",
        dueDate: "",
        amount: 0,
        generateInvoice: "on_completion",
    }

    // Submit mutation
    const mutation = useMutation({
        mutationFn: (values: MilestoneFormData) => {
            return isEditMode ? updateMilestone(milestone.id, values, projectId) : createMilestone(values, projectId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects", projectId] });
            setIsSuccess(true);
        },
    });

    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<MilestoneFormData>({
        resolver: zodResolver(milestoneSchema),
        defaultValues: defaultValues,
    });

    const onSubmit = (data: MilestoneFormData) => {
        if (isEditMode && milestone?.id) {
            mutation.mutate(data);
        } else {
            mutation.mutate(data);
        }
    };

    if (mutation.isPending) return (
        <div className="absolute inset-0 bg-[var(--background)]/70 flex items-center justify-center z-10 md:rounded-l-[50px]">
            <Loader />
        </div>
    );

    if (isSuccess) {
        return <SuccessForm
            iconPath={isEditMode ? "/milestone-update.svg" : "/milestone-create.svg"}
            title={isEditMode ? "Milestone updated successfully" : "Milestone created successfully"}
            message={isEditMode ? "The milestone details were updated. You can view the latest updates in your project overview." : "Your milestone has been saved successfully."}
            onCancel={onCancel}
        />
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 pb-40">
            {/* Project Name */}
            <div>
                <Input
                    color="bg-[var(--background)]"
                    label="Milestone Name"
                    placeholder="Milestone Name..."
                    register={register("name")}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            {/* Description */}
            <div>
                <TextArea
                    label="Milestone Description"
                    placeholder="Description..."
                    color="bg-[var(--background)]"
                    register={register("description")}
                />
            </div>

            {/* Amount */}
            <div>
                <Input
                    color="bg-[var(--background)]"
                    label="Amount"
                    placeholder="3000"
                    type="number"
                    min={0}
                    register={register("amount", { valueAsNumber: true })}
                    endAdornment={<span>CAD</span>}
                />
                {errors.amount && (
                    <p className="text-sm text-red-500">{errors.amount.message}</p>
                )}
            </div>

            {/* Dates */}
            <div>
                <Input
                    color="bg-[var(--background)]"
                    label="Due Date"
                    type="date"
                    min={0}
                    register={register("dueDate")}
                />
                {errors.dueDate && (
                    <p className="text-sm text-red-500">{errors.dueDate.message}</p>
                )}
            </div>

            {/* Generate Invoice */}
            <div>
                <Controller
                    name="generateInvoice"
                    control={control}
                    defaultValue=""
                    render={({ field, fieldState }) => (
                        <SelectInput
                            label="When to Generate Invoice"
                            id="generateInvoice"
                            options={GENERATE_INVOICE_OPTIONS}
                            value={
                                GENERATE_INVOICE_OPTIONS.find(opt => opt.value === field.value) ||
                                null
                            }
                            onChange={(opt) => field.onChange(opt.value)}
                            error={fieldState.error?.message}
                        />
                    )}
                />
            </div>

            <FormFooter
                onCancel={onCancel}
                onSubmit={handleSubmit(onSubmit)}
                disableSubmit={isSubmitting || mutation.isPending}
                submitLabel={mutation.isPending ? "Saving..." : "Save"}
            />
        </form>
    );
}
