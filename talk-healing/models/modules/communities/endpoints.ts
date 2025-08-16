import { API_ENDPOINT, REQUEST_METHOD } from '../../api/endpoint.types';
import * as SCHEMAS from './schemas';

const TRANSFORMERS = {
    mediaTransformer: (data: Record<string, any>) => ({
        ...data,
        created_on: new Date(data.created_on),
        edited_on: new Date(data.edited_on),
    }),
   
    postIdMediaTransformer: (data: Record<string, any>) => ({
        ...data,
        created_on: new Date(data.created_on),
        edited_on: new Date(data.edited_on),
        post: data.post.map(TRANSFORMERS.userTransformer),
    }),
    userTransformer: (data: Record<string, any>) => ({
        ...data,
        created_on: new Date(data.created_on),
        edited_on: new Date(data.edited_on),
        media: data.media.map(TRANSFORMERS.mediaTransformer),
    }),

    userActionsTransformer: (data: Record<string, any>) => ({
        ...data,
        created_on: new Date(data.created_on),
        edited_on: new Date(data.edited_on),
        created_at: new Date(data.created_at),
    }),
  
    communitiesPaginatedTransformer: (data: Record<string, any>) => ({
        ...data,
        results: data.results.map(TRANSFORMERS.userTransformer),
    }),
    baseCommunitiesPaginatedTransformer: (data: Record<string, any>) => ({
        ...data,
        results: data.results.map(TRANSFORMERS.mediaTransformer),
    }),

};
export const API_ENDPOINTS = {
    getCommunities: new API_ENDPOINT({
        url: '/community/',
        method: REQUEST_METHOD.GET,
        response: SCHEMAS.CommunityPaginated,
        transformer: TRANSFORMERS.baseCommunitiesPaginatedTransformer,
    }),
    getIDCommunity: new API_ENDPOINT({
        url: '/community/{id}/',
        method: REQUEST_METHOD.GET,
        response: SCHEMAS.IdCommunityDataSchema,
        transformer: TRANSFORMERS.postIdMediaTransformer,
    }),

    getCommunityContent: new API_ENDPOINT({
        url: '/community/post',
        method: REQUEST_METHOD.GET,
        response: SCHEMAS.PostInIdCommunityData,
        transformer: null,

    }),
    
    postCommunity: new API_ENDPOINT({
        url: '/community/',
        method: REQUEST_METHOD.POST,
        response: SCHEMAS.CommunityPostMediaSchema,
        transformer: TRANSFORMERS.mediaTransformer,
    }),

    postInCommunity: new API_ENDPOINT({
        url: '/community/post/',
        method: REQUEST_METHOD.POST,
        response: SCHEMAS.PostInCommunityContentSchema,
        transformer: TRANSFORMERS.mediaTransformer,

    }),
    postInCommunityMedia: new API_ENDPOINT({
        url: '/community/media/',
        method: REQUEST_METHOD.POST,
        response: SCHEMAS.PostInCommunityMediaSchema,
        transformer: TRANSFORMERS.mediaTransformer,

    }),
    postCommunityMember: new API_ENDPOINT({
        url: '/community/member/',
        method: REQUEST_METHOD.POST,
        response: SCHEMAS.PostCommunityMemberSchema,
        transformer: TRANSFORMERS.mediaTransformer,
    }),
    postComment: new API_ENDPOINT({
        url: 'community/comment/',
        method: REQUEST_METHOD.POST,
        response: SCHEMAS.PostCommentSchema,
        transformer: TRANSFORMERS.mediaTransformer,
    }),
    getAllComments: new API_ENDPOINT({
        url: 'community/comment/',
        method: REQUEST_METHOD.GET,
        response: SCHEMAS.CommentPaginatedSchema,
        transformer: TRANSFORMERS.baseCommunitiesPaginatedTransformer,
    }),
    getIdSpecificComment: new API_ENDPOINT({
        url: 'community/comment/{id}/',
        method: REQUEST_METHOD.GET,
        response: SCHEMAS.CommentSchema,
        transformer: TRANSFORMERS.mediaTransformer,
    }),
    likeDislikePost: new API_ENDPOINT({
        url: '/community/post-like-dislike/',
        method: REQUEST_METHOD.POST,
        response: SCHEMAS.PostLikeSchema,
        transformer: null,
    }),

};
