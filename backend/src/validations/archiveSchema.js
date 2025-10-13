import { z } from 'zod';

export const archiveSchema = z.object({
    isArchived: z.boolean().default(false),
})