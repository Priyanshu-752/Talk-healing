import { Instance, types } from 'mobx-state-tree';
import { PaginatedSchemaBase, BaseModelSchemaBase } from '@/models/api/endpoint.types';
 
export const HomeSchema = types.model({
    ...BaseModelSchemaBase,
    community
})
