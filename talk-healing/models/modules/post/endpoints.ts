import { API_ENDPOINT,REQUEST_METHOD } from "@/models/api/endpoint.types";
import * as SCHEMAS from "./schemas"

const TRANSFORMERS = {
    userTransformer: (data: Record<string, any>) => ({
        ...data,
        created
    })
}