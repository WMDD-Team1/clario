import { createProject, fetchAllClients } from "@/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Spinner from "../Spinner";
import FormFooter from "./FormFooter";
import Input from "@components/Input";

// Validation schema
const projectSchema = z.object({
    name: z.string().min(3, "Project name is required"),
    clientId: z.string().optional(),
    description: z.string().optional(),
    startDate: z.string().nonempty("Start date required"),
    dueDate: z.string().nonempty("Due date required"),
    totalBudget: z.number().positive("Budget must be greater than 0"),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
    onCancel: () => void;
}

export default function ProjectForm({ onCancel }: ProjectFormProps) {
    const queryClient = useQueryClient();

    // Fetch clients
    const { data, isLoading: clientsLoading } = useQuery({
        queryKey: ["clients"],
        queryFn: () => fetchAllClients(),
    });

    const clients = data?.data ?? [];

    // Submit mutation
    const mutation = useMutation({
        mutationFn: createProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            onCancel();
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            name: "",
            description: "",
            clientId: "",
            startDate: "",
            dueDate: "",
            totalBudget: 0,
        },
    });

    const onSubmit = (data: ProjectFormData) => {
        mutation.mutate(data);
    };

    if (clientsLoading) return <Spinner message="Loading clients..." />;

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
