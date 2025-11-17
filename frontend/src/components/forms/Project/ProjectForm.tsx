import { createProject, fetchAllClients, ProjectApiResponse, updateProject } from '@/api';
import Input from '@components/Input';
import Loader from '@components/Loader';
import TextArea from '@components/TextArea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useRef, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { file, z } from 'zod';
import Spinner from '../../Spinner';
import FormFooter from '../FormFooter';
import SuccessForm from '../SuccessForm';
import { useNavigate } from 'react-router-dom';
import { Plus } from '@assets/icons';

// Validation schema
const projectSchema = z
  .object({
    name: z.string().min(3, 'Project name is required'),
    clientId: z.string().nonempty('Client is required'),
    description: z.string().optional(),
    upfrontAmount: z.number().optional(),
    startDate: z.string().nonempty('Start date required'),
    dueDate: z.string().nonempty('Due date required'),
    totalBudget: z.number().positive('Budget must be greater than 0'),
    file: file().optional(),
  })
  .refine((data) => new Date(data.dueDate) >= new Date(data.startDate), {
    error: 'Due Date must be after Start Sate',
    path: ['dueDate'],
  })
  .refine((data) => data.upfrontAmount === undefined || data.upfrontAmount <= data.totalBudget, {
    message: 'Upfront amount cannot exceed total budget',
    path: ['upfrontAmount'],
  });

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  onCancel: () => void;
  project?: ProjectApiResponse | null;
  contractFile: File | null;
  onOpenClientSlide?: () => void;
  isPrefilled: boolean;
}

export default function ProjectForm({
  onCancel,
  project,
  contractFile,
  isPrefilled,
  onOpenClientSlide,
}: ProjectFormProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [newProjectId, setNewProjectId] = useState<string | null>(null);

  const [clientOpen, setClientOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch clients
  const { data, isLoading: clientsLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: () => fetchAllClients(),
  });

  const isEditMode = !!project;
  const defaultValues = isEditMode
    ? {
        name: project.name,
        clientId:
          typeof project.clientId === 'object' && project.clientId !== null
            ? project.clientId.id
            : typeof project.clientId === 'string'
              ? project.clientId
              : '',
        description: project.description ?? '',
        upfrontAmount: project.upfrontAmount ?? 0,
        startDate: project.startDate.split('T')[0],
        dueDate: project.dueDate.split('T')[0],
        totalBudget: project.totalBudget,
      }
    : {
        name: '',
        description: '',
        clientId: '',
        startDate: '',
        dueDate: '',
        totalBudget: 0,
        upfrontAmount: 0,
      };

  const clients = data?.data ?? [];

  // Filter clients based on search
  const filteredClients = clients.filter((client: any) =>
    client.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setClientOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Submit mutation
  const mutation = useMutation({
    mutationFn: (values: ProjectFormData) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('clientId', values.clientId);
      formData.append('description', values.description ?? '');
      formData.append('upfrontAmount', String(values.upfrontAmount ?? 0));
      formData.append('startDate', values.startDate);
      formData.append('dueDate', values.dueDate);
      formData.append('totalBudget', String(values.totalBudget));
      if (isPrefilled && contractFile) {
        formData.append('file', contractFile);
      }
      return isEditMode && !isPrefilled
        ? updateProject(project.id, formData)
        : createProject(formData);
    },
    onSuccess: (project) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });

      if (project?.id) {
        queryClient.invalidateQueries({ queryKey: ['projects', project.id] });
      }
      setIsSuccess(true);
      setNewProjectId(project?.id ?? null);
    },
  });

  const {
    register,
    handleSubmit,
    control,
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
  if (mutation.isPending)
    return (
      <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10 rounded-l-[50px]">
        <Loader />
      </div>
    );

  if (isSuccess) {
    return (
      <SuccessForm
        iconPath={isEditMode && !isPrefilled ? '/update-success.svg' : '/create-success.svg'}
        title={isEditMode && !isPrefilled ? 'Project updated successfully' : 'All Set!'}
        label={!(isEditMode && !isPrefilled) ? 'View' : undefined}
        message={
          isEditMode && !isPrefilled
            ? 'The project details were updated. You can view the latest updates in your project overview.'
            : 'Your project has been saved successfully.'
        }
        onCancel={
          isEditMode && !isPrefilled
            ? onCancel
            : newProjectId
              ? () => navigate(`/projects/${newProjectId}`)
              : onCancel
        }
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mb-40">
      {/* Project Name */}
      <div>
        <Input
          color="bg-white"
          label="Project Name"
          placeholder="Project Name..."
          register={register('name')}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>

      {/* Client */}
      {/* <div className="relative" ref={dropdownRef}> */}
      {/* <label className="block text-sm text-gray-500">Client</label>
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
                </select> */}
      <Controller
        name="clientId"
        control={control}
        render={({ field }) => (
          <div className="relative" ref={dropdownRef}>
            <Input
              label="Client"
              placeholder="Client Name..."
              value={
                field.value
                  ? clients.find((c: any) => c.id === field.value)?.name || searchValue
                  : searchValue
              }
              onFocus={() => setClientOpen(true)}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setClientOpen(true);
                field.onChange('');
              }}
            />

            <div
              className={`absolute bg-[var(--primitive-colors-brand-primary-025)] border border-[var(--primitive-colors-gray-light-mode-200)] shadow-md backdrop-blur-sm p-[1rem] rounded-xl top-[5rem] w-full ${clientOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none'} transition-all duration-300 z-30 max-h-[300px] overflow-y-scroll`}
            >
              {filteredClients.length > 0 ? (
                filteredClients.map((client: any) => (
                  <p
                    onClick={() => {
                      field.onChange(client.id);
                      setSearchValue(client.name);
                      setClientOpen(false);
                    }}
                    key={client.id}
                    className="flex flex-row justify-between items-center mb-1 pb-2 cursor-pointer px-2 py-1 rounded transition-all relative group"
                  >
                    {client.name}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--primitive-colors-brand-primary-400)] transition-all duration-300 ease-out group-hover:left-0 group-hover:w-full" />
                  </p>
                ))
              ) : (
                <p className="text-gray-500 text-sm text-center py-2">No clients found</p>
              )}
            </div>

            <Plus
              className="absolute right-[1rem] top-5 cursor-pointer hover:opacity-70 transition-opacity"
              onClick={() => {
                onOpenClientSlide?.();
                setClientOpen(false);
              }}
            />

            {errors.clientId && (
              <p className="text-sm text-red-500 mt-1">{errors.clientId.message}</p>
            )}
          </div>
        )}
      />

      {/* Description */}
      <div>
        <TextArea label="Project Description" color="bg-white" register={register('description')} />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Input
            color="bg-white"
            label="Start Date"
            type="date"
            min={0}
            register={register('startDate')}
          />
          {errors.startDate && <p className="text-sm text-red-500">{errors.startDate.message}</p>}
        </div>

        <div>
          <Input
            color="bg-white"
            label="Due Date"
            type="date"
            min={0}
            register={register('dueDate')}
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
          register={register('upfrontAmount', { valueAsNumber: true })}
          endAdornment={<span>CAD</span>}
        />
        {errors.upfrontAmount && (
          <p className="text-sm text-red-500">{errors.upfrontAmount.message}</p>
        )}
      </div>

      {/* Budget */}
      <div>
        <Input
          color="bg-white"
          label="Total Budget"
          placeholder="3000"
          type="number"
          min={0}
          register={register('totalBudget', { valueAsNumber: true })}
          endAdornment={<span>CAD</span>}
        />
        {errors.totalBudget && <p className="text-sm text-red-500">{errors.totalBudget.message}</p>}
      </div>

      <FormFooter
        onCancel={onCancel}
        onSubmit={handleSubmit(onSubmit)}
        disableSubmit={isSubmitting || mutation.isPending}
        submitLabel={mutation.isPending ? 'Saving...' : 'Save'}
      />
    </form>
  );
}
