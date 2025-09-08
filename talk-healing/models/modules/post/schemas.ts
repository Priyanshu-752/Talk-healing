
import { Instance, types } from 'mobx-state-tree';
import { BaseModelSchemaBase } from '@/models/api/endpoint.types';

export const FeedForum = types.model({
    ...BaseModelSchemaBase,
    title: types.string,
    content: types.string,
    watch_count: types.number,
    author: types.maybeNull(types.string),
    category: types.maybeNull(types.string),
})
export interface FeedForum extends Instance<typeof FeedForum> { }

export const FeedForumMedia = types.model({
    ...BaseModelSchemaBase,
    image: types.maybeNull(types.string),
    media: types.maybeNull(types.string),
    forum: types.maybeNull(types.string),
})
export interface FeedForumMedia extends Instance<typeof FeedForumMedia> { }

