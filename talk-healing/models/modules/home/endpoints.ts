import { API_ENDPOINT, REQUEST_METHOD } from '../../api/endpoint.types';
import * as SCHEMAS from './schemas';

const TRANSFORMERS = {
    mediaTransformer: (data: Record<string, any>) => ({
        ...data,
        created_on: new Date(data.created_on),
        edited_on: new Date(data.edited_on),
    }),
    // mediaTransformer: (data: Record<string, any>) => ({
    //     ...data,
    //     created_on: new Date(data.created_on),
    //     edited_on: new Date(data.edited_on),
    // }),
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
    //first the created,edited keys are transformed in userTransformer,
    // inside that media array has created,edited on keys that are transformed using mediatransformer
    // results:[{created_on,edited_on, media:[{created_on,edited_on}...]}]
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
    getHomeCommunities: new API_ENDPOINT({
        url: '/home/',
        method: REQUEST_METHOD.GET,
        response: null,
        transformer: null,
    }),
    // getHomeIDCommunity: new API_ENDPOINT({
    //     url: '/home/{id}/',
    //     method: REQUEST_METHOD.GET,
    //     response: SCHEMAS.IdCommunityDataSchema,
    //     transformer: TRANSFORMERS.postIdMediaTransformer,
    // }),

};
