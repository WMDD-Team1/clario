import { useMutation, UseMutationOptions, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { MilestoneApiResponse, updateMilestone } from '@api/index';
import { useLoader } from '@components/LoaderProvider';

export const useUpdateMilestone = (
    projectId: string,
    milestoneId?: string,
    options?: UseMutationOptions<
        {milestone: MilestoneApiResponse} | null, // return type
        Error, // error type
        Partial<MilestoneApiResponse>, // variables
        { previousData: unknown } // context
    >
): UseMutationResult<
    {milestone: MilestoneApiResponse} | null,    // mutationFn return type
    Error,      // error type
    Partial<MilestoneApiResponse>,    // new data
    { previousData: unknown } // context type
> => {
    const queryClient = useQueryClient();
    const { setIsLoading } = useLoader();

    return useMutation({
        mutationFn: async (data) => {
            if (!milestoneId) return Promise.resolve(null);
            setIsLoading(true);
            return await updateMilestone(milestoneId, { ...data }, projectId);
        },

        onMutate: async () => {
            // Cancel ongoing fetches for this project
            await queryClient.cancelQueries({ queryKey: ['project', projectId, milestoneId] });

            // Snapshot current cache
            const previousData = queryClient.getQueryData(['project', projectId, milestoneId]);

            return { previousData };
        },

        onError: (err, _, context) => {
            // Roll back on failure
            if (context?.previousData) {
                queryClient.setQueryData(['projects', projectId], context.previousData);
            }
        },

        onSettled: () => {
            // Always refetch after success/failure to sync with server
            queryClient.invalidateQueries({ queryKey: ["projects", projectId] });
            setIsLoading(false);
        },
        ...options,
    });
};
