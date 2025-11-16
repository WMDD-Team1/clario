import { createProject, fetchAllClients, ProjectApiResponse, updateProject } from "@/api";
import Input from "@components/Input";
import Loader from "@components/Loader";
import TextArea from "@components/TextArea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Spinner from "../../Spinner";
import FormFooter from "../FormFooter";
import SuccessForm from "../SuccessForm";
import { useNavigate } from "react-router-dom";
import { Plus } from "@assets/icons";

// Validation schema
const projectSchema = z.object({
    name: z.string().min(3, "Project name is required"),
    clientId: z.string().nonempty("Client is required"),
    description: z.string().optional(),
    upfrontAmount: z.number().optional(),
    startDate: z.string().nonempty("Start date required"),
    dueDate: z.string().nonempty("Due date required"),
    totalBudget: z.number().positive("Budget must be greater than 0"),
}).refine(
    (data) => new Date(data.dueDate) >= new Date(data.startDate),
    {
        error: "Due Date must be after Start Sate",
        path: ["dueDate"]
    }
).refine(
    (data) => data.upfrontAmount === undefined || data.upfrontAmount <= data.totalBudget,
    {
        message: "Upfront amount cannot exceed total budget",
        path: ["upfrontAmount"]
    }
)

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
    onCancel: () => void;
    project?: ProjectApiResponse | null;
    onOpenClientSlide?:() => void;
    isPrefilled: boolean;
}

export default function ProjectForm({ onCancel, project, isPrefilled, onOpenClientSlide }: ProjectFormProps) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState(false);
    const [newProjectId, setNewProjectId] = useState<string | null>(null);

    // Fetch clients
    const { data, isLoading: clientsLoading } = useQuery({
        queryKey: ["clients"],
        queryFn: () => fetchAllClients(),
    });

    const isEditMode = !!project;
    const defaultValues = isEditMode ? {
        name: project.name,
        clientId: typeof project.clientId === "object" && project.clientId !== null ? project.clientId.id : (typeof project.clientId === "string" ? project.clientId : ""),
        description: project.description ?? "",
        upfrontAmount: project.upfrontAmount ?? 0,
        startDate: project.startDate.split("T")[0],
        dueDate: project.dueDate.split("T")[0],
        totalBudget: project.totalBudget,
    } : {
        name: "",
        description: "",
        clientId: "",
        startDate: "",
        dueDate: "",
        totalBudget: 0,
        upfrontAmount: 0,
    }

    const clients = data?.data ?? [];

    // Submit mutation
    const mutation = useMutation({
        mutationFn: (values: ProjectFormData) => {
            return (isEditMode && !isPrefilled) ? updateProject(project.id, values) : createProject(values);
        },
        onSuccess: (project) => {
            if (project) queryClient.invalidateQueries({ queryKey: ["projects", project.id] });
            if (!project) queryClient.invalidateQueries({ queryKey: ["projects"] });
            setIsSuccess(true);
            setNewProjectId(project?.id ?? null);
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: defaultValues,
    });

    const onSubmit = (data: ProjectFormData) => {
        if (isEditMode && project?.id) {
            mutation.mutate(data);
        } else {
            mutation.mutate(data);
        }
    };

    if (clientsLoading) return <Spinner message="Loading clients..." />;
    if (mutation.isPending) return (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
            <Loader />
        </div>
    );

    if (isSuccess) {
        return <SuccessForm
            iconPath={(isEditMode && !isPrefilled) ? "/update-success.svg" : "/create-success.svg"}
            title={(isEditMode && !isPrefilled) ? "Project updated successfully" : "All Set!"}
            label={!(isEditMode && !isPrefilled) ? "View" : undefined}
            message={(isEditMode && !isPrefilled) ? "The project details were updated. You can view the latest updates in your project overview." : "Your project has been saved successfully."}
            onCancel={(isEditMode && !isPrefilled) ? onCancel : newProjectId ? () => navigate(`/projects/${newProjectId}`) : onCancel}
        />
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mb-40">
            {/* Project Name */}
            <div>
                <Input
                    color="bg-white"
                    label="Project Name"
                    placeholder="Project Name..."
                    register={register("name")}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            {/* Client */}
            <div className="relative">
                <label className="block text-sm text-gray-500">Client</label>
                <select
                    {...register("clientId")}
                    className="w-full border-b border-gray-300 focus:border-blue-500 outline-none py-1 bg-transparent"
                >
                    <option value="">Select a client</option>
                    {clients?.map((client: { id: string; name: string }) => (
                        <option key={client.id} value={client.id}>
                            {client.name}
                        </option>
                    ))}
                </select>
                <Plus
                className="absolute right-[1rem] top-6 cursor-pointer"
                onClick={() => {onOpenClientSlide?.()}}
                />
                {errors.clientId && <p className="text-sm text-red-500">{errors.clientId.message}</p>}
            </div>

            {/* Description */}
            <div>
                <TextArea
                    label="Project Description"
                    color="bg-white"
                    register={register("description")}
                />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <Input
                        color="bg-white"
                        label="Start Date"
                        type="date"
                        min={0}
                        register={register("startDate")}
                    />
                    {errors.startDate && <p className="text-sm text-red-500">{errors.startDate.message}</p>}
                </div>

                <div>
                    <Input
                        color="bg-white"
                        label="Due Date"
                        type="date"
                        min={0}
                        register={register("dueDate")}
                    />
                    {errors.dueDate && <p className="text-sm text-red-500">{errors.dueDate.message}</p>}
                </div>
            </div>

            {/* Upfront */}
            <div>
                <Input
                    color="bg-white"
                    label="Upfront Amount"
                    placeholder="120"
                    type="number"
                    min={0}
                    register={register("upfrontAmount", { valueAsNumber: true })}
                    endAdornment={<span>CAD</span>}
                />
                {errors.upfrontAmount && <p className="text-sm text-red-500">{errors.upfrontAmount.message}</p>}
            </div>

            {/* Budget */}
            <div>
                <Input
                    color="bg-white"
                    label="Total Budget"
                    placeholder="3000"
                    type="number"
                    min={0}
                    register={register("totalBudget", { valueAsNumber: true })}
                    endAdornment={<span>CAD</span>}
                />
                {errors.totalBudget && <p className="text-sm text-red-500">{errors.totalBudget.message}</p>}
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
