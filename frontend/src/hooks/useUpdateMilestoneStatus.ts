import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { MilestoneApiResponse, updateMilestone } from '@api/index';

export const useUpdateMilestoneStatus = (projectId: string, milestoneId?: string): UseMutationResult<
    boolean,                       // mutationFn return type
    Error,                                      // error type
    "Pending" | "In-Progress" | "Completed",    // variable type (deliverableId)
    { previousData: unknown } // context type
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newStatus) => {
            if (!milestoneId) return Promise.resolve(false);
            const response = await updateMilestone(milestoneId, {status: newStatus}, projectId);
            return Promise.resolve(true);
        },

        onMutate: async (newStatus) => {
            // Cancel ongoing fetches for this project
            await queryClient.cancelQueries({ queryKey: ['project', projectId, milestoneId] });

            // Snapshot current cache
            const previousData = queryClient.getQueryData(['project', projectId, milestoneId]);

            return { previousData };
        },

        onError: (err, _, context) => {
            // Roll back on failure
            if (context?.previousData) {
                queryClient.setQueryData(['project', projectId, milestoneId], context.previousData);
            }
        },

        onSettled: () => {
            // Always refetch after success/failure to sync with server
            queryClient.invalidateQueries({ queryKey: ["projects", projectId] });
        },
    });
};
