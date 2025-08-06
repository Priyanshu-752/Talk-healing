import { API_ENDPOINT, REQUEST_METHOD } from "../../api/endpoint.types";

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
    registration: new API_ENDPOINT({
        url: "/auth/registration/",
        method: REQUEST_METHOD.POST,
        response: null,
        transformer: null,
    }),
    loginUser: new API_ENDPOINT({
        url: "/auth/login/",
        method: REQUEST_METHOD.POST,
        response: null,
        transformer: null,
    }),
    logoutUser: new API_ENDPOINT({
        url: "/auth/logout/",
        method: REQUEST_METHOD.POST,
        response: null,
        transformer: null,
    }),
    passwordChange: new API_ENDPOINT({
        url: "/auth/password/change/",
        method: REQUEST_METHOD.POST,
        response: null,
        transformer: null,
    }),
    passwordReset: new API_ENDPOINT({
        url: "/auth/password/reset/",
        method: REQUEST_METHOD.POST,
        response: null,
        transformer: null,
    }),
    passwordResetRequest: new API_ENDPOINT({
        url: "/auth/password/reset-request/",
        method: REQUEST_METHOD.POST,
        response: null,
        transformer: null,
    }),
    resetPasswordConfirm: new API_ENDPOINT({
        url: "/auth/password/reset/confirm/",
        method: REQUEST_METHOD.POST,
        response: null,
        transformer: null,
    }),
    passwordResetVerify: new API_ENDPOINT({
    url: "/auth/password/reset/verify-email-otp/",
    method: REQUEST_METHOD.POST,
    response: null,
    transformer: null,
}),
 registrationVerify: new API_ENDPOINT({
        url: "/auth/registration/verify-email/",
        method: REQUEST_METHOD.POST,
        response: null,
        transformer: null,
    }),
}