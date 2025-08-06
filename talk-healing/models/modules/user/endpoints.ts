import { API_ENDPOINT, REQUEST_METHOD } from "../../api/endpoint.types"
import * as SCHEMAS from "./schemas"
const TRANSFORMERS = {
    referralSource: (data:Record<string,any>) => ({
        ...data,
    }),
    userTransformer: (data:Record<string,any>) => ({
        ...data,
        created_on: new Date(data.created_on),
        edited_on: new Date(data.edited_on),
    }),
    userPaginatedTransformer: (data:Record<string,any>) => ({
        ...data,
        user: {
            ...data.user,
            created_on: new Date(data.created_on),
            edited_on: new Date(data.edited_on),
        }
    }),
    accessTokenTransformer: (data:Record<string,any>) => ({
        ...data,
        user: TRANSFORMERS.userTransformer(data.user),
    }),
}
 export const API_ENDPOINTS = {
    registerUser: new API_ENDPOINT({
        url: "/auth/registration/",
        method: REQUEST_METHOD.POST,
        response: null,
        transformer: null,
    }),
    loginUser: new API_ENDPOINT({
        url: "/auth/login/",
        method: REQUEST_METHOD.POST,
        response: null,
        transformer: TRANSFORMERS.userPaginatedTransformer,
    }),
    verifyEmail: new API_ENDPOINT({
        url: "/auth/registration/verify-email/",
        method: REQUEST_METHOD.POST,
        response: null,
        transformer: TRANSFORMERS.userPaginatedTransformer,
    }),

    resendVerificationEmail: new API_ENDPOINT({
        url: "/base_user/verify-email/resend/",
        method: REQUEST_METHOD.GET,
        response: null,
        transformer: TRANSFORMERS.userPaginatedTransformer,
    }),
    
    createPassword: new API_ENDPOINT({
        url: "/auth/create-password/",
        method: REQUEST_METHOD.POST,
        response: null,
        transformer: null,
    }),
    logoutuser: new API_ENDPOINT({
        url: "/auth/logout/",
        method: REQUEST_METHOD.POST,
        response: null,
        transformer: null,
    }),
}