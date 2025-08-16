/* eslint-disable max-len */
// import { result } from 'lodash';
import { Instance, types } from 'mobx-state-tree';
import { PaginatedSchemaBase, BaseModelSchemaBase } from '@/models/api/endpoint.types';

export const CommunitySchema = types.model({
    ...BaseModelSchemaBase,
    member: types.array(types.array(types.string)),
    community_name: types.string,
    community_img: types.string,
    // created_on: types.maybeNull(types.string),
});
export interface CommunitySchemaType extends Instance<typeof CommunitySchema> { }

export const CommunityPaginated = types.model({
    ...PaginatedSchemaBase,
    results: types.array(CommunitySchema),
});
export interface CommunityPaginatedType extends Instance<typeof CommunityPaginated> { }

export const CommunityPostMediaSchema = types.model({
    ...BaseModelSchemaBase,
    community_name: types.maybeNull(types.string),
    community_img: types.maybeNull(types.string),
    commmunity_type: types.maybeNull(types.string),
});
export interface CommunityPostMediaSchemaType extends Instance<typeof CommunityPostMediaSchema> { }

export const CreatorSchema = types.model({
    id: types.maybe(types.identifier), // Allow null or undefined, though it's not typical for an identifier
    full_name: types.maybe(types.string),
    avatar: types.maybe(types.string),
});

export interface CreatorSchemaType extends Instance<typeof CreatorSchema> { }

export const PostInCommunityContentSchema = types.model({
    ...BaseModelSchemaBase,
    content: types.string,
    post_type: types.string,
    community: types.maybeNull(types.string),
    creator: types.union(CreatorSchema, types.string), // Either an object or a string
});

export interface PostInCommunityContentSchemaType extends Instance<typeof PostInCommunityContentSchema> { }

export const PostInCommunityMediaSchema = types.model({
    ...BaseModelSchemaBase,
    image: types.maybeNull(types.string),
    media: types.maybeNull(types.string),
    community_post: types.string,
});
export interface PostInCommunityMediaSchemaType extends Instance<typeof PostInCommunityMediaSchema> { }

export const CommunityContentSchema = types.model({
    ...PostInCommunityContentSchema.properties,
    comment_count: types.number,
    like_count: types.number,
    dislike_count: types.number,
    media: types.array(PostInCommunityMediaSchema),
});
export interface CommunityContentSchemaType extends Instance<typeof CommunityContentSchema> { }

export const CommunityPaginatedContent = types.model({
    ...PaginatedSchemaBase,
    results: types.array(CommunityContentSchema), // Replace with a defined schema
});
export interface CommunityPaginatedContentType extends Instance<typeof CommunityPaginatedContent> { }

export const PostInIdCommunityData = types.model({
    id: types.maybeNull(types.string),
    edited_on: types.maybeNull(types.string),
    created_on: types.maybeNull(types.string),
    _data: types.maybeNull(types.frozen()),
    content: types.maybeNull(types.string),
    post_type: types.maybeNull(types.string),
    community: types.maybeNull(CommunityPostMediaSchema),
    creator: types.maybeNull(CreatorSchema), // Assuming creator is a single object
    comment_count: types.maybeNull(types.number),
    like_count: types.maybeNull(types.number),
    dislike_count: types.maybeNull(types.number),
    media: types.maybeNull(types.array(PostInCommunityMediaSchema)), // Ensure it's an array
});

export interface PostInIdCommunityDataType extends Instance<typeof PostInIdCommunityData> { }

export const PostInIdCommunityDataSchema = types.model({
    ...PaginatedSchemaBase,
    results: types.array(PostInIdCommunityData),
});
export interface PostInIdCommunityDataSchemaType extends Instance<typeof PostInIdCommunityDataSchema> { }
export const IdCommunityData = types.model({
    // ...BaseModelSchemaBase,
    id: types.maybeNull(types.string),
    created_on: types.maybeNull(types.string),
    community_name: types.string,
    community_img: types.string,
    commmunity_type: types.string,
    author: types.maybeNull(types.string), // Author can be null
    post: types.array(PostInIdCommunityData),
});

export interface IdCommunityDataType extends Instance<typeof IdCommunityData> { }
export const IdCommunityDataSchema = types.model({
    ...PaginatedSchemaBase,
    results: types.array(IdCommunityData),
});
export interface IdCommunityDataSchemaType extends Instance<typeof IdCommunityDataSchema> { }

export const PostCommunityMemberSchema = types.model({
    ...BaseModelSchemaBase,
    community: types.string,
    member: types.string,
});
export interface PostCommunityMemberSchemaType extends Instance<typeof PostCommunityMemberSchema> { }

export const PostCommentSchema = types.model({
    ...BaseModelSchemaBase,
    content: types.string,
    community_post: types.string,
    user: types.union(types.string, types.maybeNull(CreatorSchema)),
});
export interface PostCommentSchemaType extends Instance<typeof PostCommentSchema> { }

export const CommentSchema = types.model({
    ...PostCommentSchema.properties,
});
export interface CommentSchemaType extends Instance<typeof CommentSchema> { }
export const CommentPaginatedSchema = types.model({
    ...PaginatedSchemaBase,
    results: types.array(CommentSchema),
});
export interface CommentPaginatedSchemaType extends Instance<typeof CommentPaginatedSchema> { }

export const PostLikeSchema = types.model({
    ...BaseModelSchemaBase,
    reaction_type: types.string,
    created_at: types.Date,
    user: types.string,
    post: types.string,
});
export interface PostLikeSchemaType extends Instance<typeof PostLikeSchema> { }
