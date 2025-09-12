/* eslint-disable max-len */
// import { result } from 'lodash';
import { Instance, types } from 'mobx-state-tree';
import { PaginatedSchemaBase, BaseModelSchemaBase } from '@/models/api/endpoint.types';

export const HomeSchema = types.model({
    ...BaseModelSchemaBase,
    community_name: types.maybeNull(types.string),
    community_type: types.maybeNull(types.string),
});
export interface HomeSchemaType extends Instance<typeof HomeSchema> { }

export const CommunityPaginated = types.model({
    ...PaginatedSchemaBase,
    results: types.array(HomeSchema),
});
export interface CommunityPaginatedType extends Instance<typeof CommunityPaginated> { }

export const CreatorSchema = types.model({
    id: types.maybe(types.identifier), // Allow null or undefined, though it's not typical for an identifier
    full_name: types.maybe(types.string),
    avatar: types.maybe(types.string),
});

export interface CreatorSchemaType extends Instance<typeof CreatorSchema> { }

export const PostInHomeMediaSchema = types.model({
    // ...BaseModelSchemaBase,
    image: types.maybeNull(types.string),
    media: types.maybeNull(types.string),
    // community_post: types.string,
});
export interface PostInHomeMediaSchemaType extends Instance<typeof PostInHomeMediaSchema> { }

export const PostInIdHomeData = types.model({
    id: types.maybeNull(types.string),
    media: types.maybeNull(types.array(PostInHomeMediaSchema)), // Ensure it's an array
    creator: types.maybeNull(CreatorSchema), // User who created the post
    author: types.maybeNull(types.string), // Author ID for backward compatibility
    created_on: types.maybeNull(types.string),
    edited_on: types.maybeNull(types.string),
    _data: types.maybeNull(types.frozen()),
    content: types.maybeNull(types.string),
    title: types.maybeNull(types.string), // Add title field
    image: types.maybeNull(types.string), // Add image field for posts
    //post_type: types.maybeNull(types.string),
    //community: types.maybeNull(HomeSchema),
    //comment_count: types.maybeNull(types.number),
   // like_count: types.maybeNull(types.number),
    //dislike_count: types.maybeNull(types.number),
});

export interface PostInIdHomeDataType extends Instance<typeof PostInIdHomeData> { }

export const PostInIdHomeDataSchema = types.model({
    ...PaginatedSchemaBase,
    results: types.array(PostInIdHomeData),
});
export interface PostInIdHomeDataSchemaType extends Instance<typeof PostInIdHomeDataSchema> { }
