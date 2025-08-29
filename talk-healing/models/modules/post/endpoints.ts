import { API_ENDPOINT, REQUEST_METHOD } from "../../api/endpoint.types"
import * as SCHEMAS from "./schema"

const TRANSFORMERS = {
    userTransformer: (data: Record<string, any>) => ({
        ...data,
        created_on: new Date(data.created_on),
        edited_on: new Date(data.edited_on),
    }),
}

export const API_ENDPOINTS = {
    createFeed: new API_ENDPOINT({
        url: "/forum/",
        method: REQUEST_METHOD.POST,
        response: SCHEMAS.FeedForum,
        transformer: TRANSFORMERS.userTransformer,
    }),

    createFeedMedia: new API_ENDPOINT({
        url: "/forum/media/",
        method: REQUEST_METHOD.POST,
        response: SCHEMAS.FeedForumMedia,
        transformer: TRANSFORMERS.userTransformer,
    })

}

