import { types, flow } from "mobx-state-tree"
import { withEnvironment } from "../../extensions/with-environment"
import * as SCHEMAS from "./schemas"
import { API_ENDPOINTS } from "./endpoints"
import { ACTION_RESPONSES } from "@/models/api/endpoint.types"

export const NotificationStore = types
    .model({
        notificationsPaginated: types.maybeNull(SCHEMAS.NotificationsPaginated),
    })
    .extend(withEnvironment)
    .actions((self) => ({
        getNotifications: flow(function* () {
            const response = yield self.environment.api.call(API_ENDPOINTS.getNotifications,{})
            switch (response.status) {
                case 200:
                    self.notificationsPaginated = SCHEMAS.NotificationsPaginated.create(response.data)
                    return ACTION_RESPONSES.success
                default:
                    console.error("UNHANDLED ERROR")
                    break
            }
            return ACTION_RESPONSES.failure
        }),
    }))
