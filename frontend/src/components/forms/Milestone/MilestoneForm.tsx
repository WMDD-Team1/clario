import { createMilestone, MilestoneApiResponse, updateMilestone } from "@/api";
import Input from "@components/Input";
import Loader from "@components/Loader";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormFooter from "../FormFooter";

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

type MilestoneFormData = z.infer<typeof milestoneSchema>;

interface Props {
    onCancel: () => void;
    milestone?: MilestoneApiResponse | null;
    projectId: string;
}

export default function ProjectForm({ onCancel, milestone, projectId }: Props) {
    const queryClient = useQueryClient();

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
            queryClient.invalidateQueries({ queryKey: ["project"] });
            onCancel();
        },
    });

    const {
        register,
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
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
            <Loader />
        </div>
    );

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {/* Project Name */}
            <div>
                <Input
                    color="bg-white"
                    label="Milestone Name"
                    placeholder="Milestone Name..."
                    register={register("name")}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm text-gray-500">Milestone Description</label>
                <textarea
                    {...register("description")}
                    placeholder="Description..."
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
                />
            </div>

            {/* Amount */}
            <div>
                <label className="block text-sm text-gray-500">Amount</label>
                <div className="flex items-center border-b border-gray-300 py-1">
                    <input
                        type="number"
                        {...register("amount", { valueAsNumber: true })}
                        placeholder="3000"
                        className="w-full outline-none"
                    />
                    <span className="text-gray-500 text-sm font-medium">CAD</span>
                </div>
                {errors.amount && (
                    <p className="text-sm text-red-500">{errors.amount.message}</p>
                )}
            </div>

            {/* Dates */}
            <div>
                <label className="block text-sm text-gray-500">Due Date</label>
                <input
                    type="date"
                    {...register("dueDate")}
                    className="w-full border border-gray-300 rounded-lg px-2 py-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                {errors.dueDate && (
                    <p className="text-sm text-red-500">{errors.dueDate.message}</p>
                )}
            </div>

            {/* Generate Invoice */}
            <div>
                <label className="block text-sm text-gray-500">When to Generate Invoice</label>
                <select
                    {...register("generateInvoice")}
                    className="w-full border-b border-gray-300 focus:border-blue-500 outline-none py-1 bg-transparent"
                >
                    <option value="" disabled>Select a client</option>
                    <option value="on_completion">On Completion</option>
                    <option value="on_due_date">On Due Date</option>
                </select>
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
