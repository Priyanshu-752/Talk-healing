import { API_ENDPOINT } from '../../api/endpoint.types';
import { types, flow } from 'mobx-state-tree';
import { withEnvironment } from '../../extensions/with-environment';
import { ACTION_RESPONSES } from '../../api/endpoint.types';
import * as ForumSchema from './schemas';
import { API_ENDPOINTS } from './endpoints';


export const FeedForumStore = types.model({
    feedForumData: types.maybeNull(ForumSchema.FeedForum),
    feedForumMediaData: types.maybeNull(ForumSchema.FeedForumMedia),

})
    .extend(withEnvironment)
    .actions((self) => ({
        postForum: flow(function* () {
            const response = yield self.environment.api.call(API_ENDPOINTS.createFeed, {
                title: "testingpost in feed",
                content: "testing553434",
                author: "50700ce5-3195-40b0-bada-b0bf945b44ad",
                category: "96c3a9a8-46d7-4f26-9248-b71ba2e7dcd0",
                watch_count: 0,

            })


            switch (response.status) {
                case 201:
                    self.feedForumData = ForumSchema.FeedForum.create(response.data)
                    return ACTION_RESPONSES.success
                case 400:
                    return ACTION_RESPONSES.failure
                default:
                    console.error("UNHANDLED ERROR")
                    break
            }

            return ACTION_RESPONSES.failure
        }),
        postMedia: flow(function* (data: FormData) {

            const response = yield self.environment.api.call(API_ENDPOINTS.createFeedMedia, data)

            switch (response.status) {
                case 201:
                    self.feedForumMediaData = ForumSchema.FeedForumMedia.create(response.data)
                    return ACTION_RESPONSES.success
                case 400:
                    return ACTION_RESPONSES.failure
                default:
                    console.error("UNHANDLED ERROR")
                    break
            }
            return ACTION_RESPONSES.failure
        })

    }))
