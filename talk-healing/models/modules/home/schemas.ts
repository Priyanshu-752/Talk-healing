import { Instance, types } from 'mobx-state-tree';
import { PaginatedSchemaBase, BaseModelSchemaBase } from '@/models/api/endpoint.types';

export const HomeSchema = types.model({
    ...BaseModelSchemaBase,
    community_name: types.maybeNull(types.string),
    community_type: types.maybeNull(types.string),
});
export interface HomeSchemaType extends Instance<typeof HomeSchema> { }

export interface HomeSchemaType extends Instance<typeof HomeSchema> { }

export const 
