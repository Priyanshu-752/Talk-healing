import {
    API_ENDPOINT,
    REQUEST_METHOD,
} from '../../api/endpoint.types';
import * as SCHEMAS from './schemas';

const TRANSFORMERS = {
    settingsTransformer: (data:Record<string, any>) => ({
        ...data,
        created_on: new Date(data.created_on),
        edited_on: new Date(data.edited_on),
    }),
};

export const API_ENDPOINTS = {
    getSettings: new API_ENDPOINT({
        url: '/base_user/settings/',
        method: REQUEST_METHOD.GET,
        response: SCHEMAS.Settings,
        transformer: TRANSFORMERS.settingsTransformer,
    }),
    editSettings: new API_ENDPOINT({
        url: '/base_user/settings/',
        method: REQUEST_METHOD.PATCH,
        response: SCHEMAS.Settings,
        transformer: TRANSFORMERS.settingsTransformer,
    }),
    getFaqs: new API_ENDPOINT({
        url: '/api/faq/',
        method: REQUEST_METHOD.GET,
        response: SCHEMAS.FAQ,
        transformer: null,
    }),
    getFaq: new API_ENDPOINT({
        url: '/api/faq/{id}/',
        method: REQUEST_METHOD.GET,
        response: SCHEMAS.FAQ,
        transformer: null,
    }),
    referToFriend: new API_ENDPOINT({
        url: '/auth/onboarding/refer-to-friend/',
        method: REQUEST_METHOD.POST,
        response: null,
        transformer: null,
    }),
};
