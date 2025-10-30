import { createProject, fetchAllClients, ProjectApiResponse, updateProject } from "@/api";
import Input from "@components/Input";
import Loader from "@components/Loader";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Spinner from "../Spinner";
import FormFooter from "./FormFooter";

// Validation schema
const projectSchema = z.object({
    name: z.string().min(3, "Project name is required"),
    clientId: z.string().optional(),
    description: z.string().optional(),
    startDate: z.string().nonempty("Start date required"),
    dueDate: z.string().nonempty("Due date required"),
    totalBudget: z.number().positive("Budget must be greater than 0"),
}).refine(
    (data) => new Date(data.dueDate) >= new Date(data.startDate),
    {
        error: "Due Date must be after Start Sate",
        path: ["dueDate"]
    }
)

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
    onCancel: () => void;
    project?: ProjectApiResponse | null;
}

export default function ProjectForm({ onCancel, project }: ProjectFormProps) {
    const queryClient = useQueryClient();

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
    }

    const clients = data?.data ?? [];

    // Submit mutation
    const mutation = useMutation({
        mutationFn: (values: ProjectFormData) => {
            return isEditMode ? updateProject(project.id, values) : createProject(values);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects", "project"] });
            onCancel();
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

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
            <div>
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
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm text-gray-500">Project Description</label>
                <textarea
                    {...register("description")}
                    placeholder="Description..."
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
                />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="block text-sm text-gray-500">Start Date</label>
                    <input
                        type="date"
                        {...register("startDate")}
                        className="w-full border border-gray-300 rounded-lg px-2 py-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                    {errors.startDate && (
                        <p className="text-sm text-red-500">{errors.startDate.message}</p>
                    )}
                </div>

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
            </div>

            {/* Budget */}
            <div>
                <label className="block text-sm text-gray-500">Total Budget</label>
                <div className="flex items-center border-b border-gray-300 py-1">
                    <input
                        type="number"
                        {...register("totalBudget", { valueAsNumber: true })}
                        placeholder="3000"
                        className="w-full outline-none"
                    />
                    <span className="text-gray-500 text-sm font-medium">CAD</span>
                </div>
                {errors.totalBudget && (
                    <p className="text-sm text-red-500">{errors.totalBudget.message}</p>
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
