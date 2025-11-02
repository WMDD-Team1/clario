import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { deleteDeliverable } from '@api/index';

export const useDeleteDeliverable = (projectId: string, milestoneId?: string): UseMutationResult<
    boolean,                  // mutationFn return type
    Error,                    // error type
    string,                   // variable type (deliverableId)
    { previousData: unknown } // context type
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (deliverableId: string) => {
            if (!milestoneId) return Promise.resolve(false);
            return deleteDeliverable(deliverableId, projectId, milestoneId)
        },

        onMutate: async (deliverableId) => {
            // Cancel ongoing fetches for this project
            await queryClient.cancelQueries({ queryKey: ['project', projectId, milestoneId] });

            // Snapshot current cache
            const previousData = queryClient.getQueryData(['project', projectId, milestoneId]);

            // Optimistically update UI
            queryClient.setQueryData(['project', projectId, milestoneId], (old: any) =>
                old ? old.filter((d: any) => d.id !== deliverableId) : []
            );

            return { previousData };
        },

        onError: (err, _, context) => {
            // Roll back on failure
            if (context?.previousData) {
                queryClient.setQueryData(['deliverables', projectId, milestoneId], context.previousData);
            }
        },

        onSettled: () => {
            // Always refetch after success/failure to sync with server
            queryClient.invalidateQueries({ queryKey: ["project"] });
        },
    });
};
