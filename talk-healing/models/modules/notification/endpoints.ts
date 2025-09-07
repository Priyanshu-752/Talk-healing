
import {
    API_ENDPOINT,
    REQUEST_METHOD,
} from "../../api/endpoint.types"


const TRANSFORMERS = {
    notificationTransformer: (data:Record<string,any>) => ({
        ...data,
        created_on: new Date(data.created_on),
        edited_on: new Date(data.edited_on),
    }),
    notificationPaginatedTransformer: (data:Record<string,any>) => ({
        ...data,
        count: parseInt(data.count),
        results: data.results.map(TRANSFORMERS.notificationTransformer)
    }),

}
export const API_ENDPOINTS = {
    getNotifications: new API_ENDPOINT({
        url: '/notification/notification/',
        method: REQUEST_METHOD.GET,
        response: null,
        transformer: TRANSFORMERS.notificationPaginatedTransformer,
    })

}