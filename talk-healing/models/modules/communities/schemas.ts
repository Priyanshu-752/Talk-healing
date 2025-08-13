import { z } from 'zod';

export const CommunitySchema = z.object({
  id: z.string(),
  community_name: z.string().min(3).max(80),
  community_img: z.string().url().optional().nullable(),
  members: z.number().int().nonnegative().optional(),
  created_on: z.string().optional().nullable(),
  status: z.enum(['Active', 'Under Review', 'Archived']).optional().nullable(),
  category: z.string().optional().nullable(),
});
export type Community = z.infer<typeof CommunitySchema>;

export const ListParamsSchema = z.object({
  query: z.string().optional(),
  page: z.number().int().min(1).optional().default(1),
  limit: z.number().int().min(1).max(100).optional().default(24),
  sort: z.enum(['name_asc', 'name_desc', 'created_desc', 'created_asc']).optional(),
});
export type ListParams = z.infer<typeof ListParamsSchema>;

export const ListResponseSchema = z.object({
  results: z.array(CommunitySchema),
  total: z.number().int().nonnegative().optional().nullable(),
  page: z.number().int().optional(),
  limit: z.number().int().optional(),
});
export type ListResponse = z.infer<typeof ListResponseSchema>;

export const CreateSchema = z.object({
  community_name: z.string().min(3).max(80),
  community_img: z.string().url().optional(),
  category: z.string().optional(),
});
export type CreateInput = z.infer<typeof CreateSchema>;
