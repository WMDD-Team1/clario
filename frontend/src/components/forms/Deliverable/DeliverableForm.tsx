import { createDeliverable, createMilestone, DeliverableApiResponse, updateDeliverable, updateMilestone } from "@/api";
import Input from "@components/Input";
import Loader from "@components/Loader";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormFooter from "../FormFooter";

// Validation schema
const deliverableSchema = z.object({
    name: z.string().min(3, "Milestone name is required"),
    description: z.string().max(200, "Description can have up to 200 characters"),
    dueDate: z.string().nonempty("Due date required"),
});

type DeliverableFormData = z.infer<typeof deliverableSchema>;

interface Props {
    onCancel: () => void;
    deliverable?: DeliverableApiResponse | null;
    milestoneId: string;
    projectId: string;
}

export default function DeliverableForm({ onCancel, deliverable, milestoneId, projectId }: Props) {
    const queryClient = useQueryClient();

    const isEditMode = !!deliverable;
    const defaultValues = isEditMode ? {
        name: deliverable.name,
        description: deliverable.description,
        dueDate: deliverable.dueDate.split("T")[0],
    } : {
        name: "",
        dueDate: "",
        description: "",
    }

    // Submit mutation
    const mutation = useMutation({
        mutationFn: (values: DeliverableFormData) => {
            return isEditMode ? updateDeliverable(deliverable.id, values, projectId, milestoneId) : createDeliverable(values, projectId, milestoneId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects", projectId] });
            onCancel();
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<DeliverableFormData>({
        resolver: zodResolver(deliverableSchema),
        defaultValues: defaultValues,
    });

    const onSubmit = (data: DeliverableFormData) => {
        if (isEditMode && deliverable?.id) {
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
                    label="Deliverable Name"
                    placeholder="Deliverable Name..."
                    register={register("name")}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm text-gray-500">Deliverable Description</label>
                <textarea
                    {...register("description")}
                    placeholder="Description..."
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
                />
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

            <FormFooter
                onCancel={onCancel}
                onSubmit={handleSubmit(onSubmit)}
                disableSubmit={isSubmitting || mutation.isPending}
                submitLabel={mutation.isPending ? "Saving..." : "Save"}
            />
        </form>
    );
}
