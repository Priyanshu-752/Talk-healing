// models/modules/communities/endpoints.ts
import { getEnv } from '../../environment';
import {
  ListParamsSchema,
  ListResponseSchema,
  CreateSchema,
  CommunitySchema,
  type ListParams,
  type CreateInput,
  type Community,
} from './schemas';

const env = getEnv();

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${env.API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    ...init,
    cache: 'no-store',
  });
  const text = await res.text();
  const json = text ? JSON.parse(text) : null;
  if (!res.ok) throw new Error((json && (json.message || json.error)) || `HTTP ${res.status}`);
  return json as T;
}

export const communitiesAPI = {
  async list(params: ListParams = {}) {
    const safe = ListParamsSchema.parse(params);
    const sp = new URLSearchParams();
    Object.entries(safe).forEach(([k, v]) => v != null && sp.set(k, String(v)));
    const qs = sp.toString();
    const raw = await request<any>(`/communities${qs ? `?${qs}` : ''}`);
    const parsed = ListResponseSchema.parse(raw);
    const results = 'results' in parsed ? parsed.results : parsed.communities;
    return { results, total: parsed.total ?? null, page: parsed.page, limit: parsed.limit };
  },

  async create(payload: CreateInput) {
    const body = CreateSchema.parse(payload);
    const data = await request<Community>('/communities', {
      method: 'POST',
      body: JSON.stringify(body),
    });
    return CommunitySchema.parse(data);
  },
};
