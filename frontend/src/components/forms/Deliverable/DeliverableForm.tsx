import { createDeliverable, createMilestone, DeliverableApiResponse, updateDeliverable, updateMilestone } from "@/api";
import Input from "@components/Input";
import Loader from "@components/Loader";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormFooter from "../FormFooter";
import FileUpload from "@components/FileUpload";
import { useState } from "react";
import Button from "@components/Button";
import SuccessForm from "../SuccessForm";
import TextArea from "@components/TextArea";

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
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isSuccess, setIsSuccess] = useState(false);

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
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("description", values.description);
            formData.append("dueDate", values.dueDate);

            // append all files
            selectedFiles.forEach((file) => formData.append("file", file));

            return isEditMode
                ? updateDeliverable(deliverable!.id, formData, projectId, milestoneId)
                : createDeliverable(formData, projectId, milestoneId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects", projectId] });
            setIsSuccess(true);
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

    if (isSuccess) {
        return <SuccessForm
            iconPath={isEditMode ? "/update-success.svg" : "/create-success.svg"}
            title={isEditMode ? "Deliverable updated successfully" : "Deliverable created successfully"}
            message={isEditMode ? "The deliverable details were updated. You can view the latest updates in your project overview." : "Your deliverable has been saved successfully."}
            onCancel={onCancel}
        />
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4  pb-40 ">
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
                <TextArea
                    label="Deliverable Description"
                    color="bg-white"
                    register={register("description")}
                />
            </div>

            {/* File Upload */}
            <FileUpload
                onFilesSelected={(fileList) => {
                    const files = Array.from(fileList);
                    setSelectedFiles(files);
                }}
            />

            {/* Dates */}
            <div>
                <Input
                    color="bg-white"
                    label="Due Date"
                    type="date"
                    min={0}
                    register={register("dueDate")}
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
