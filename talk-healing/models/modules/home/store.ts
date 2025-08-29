/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import { flow, types } from 'mobx-state-tree';
import { ACTION_RESPONSES } from '../../api/endpoint.types';
import { withEnvironment } from '../../extensions/with-environment';
import { API_ENDPOINTS } from './endpoints';
import * as HomeSchema from './schemas';

export const HomeStore = types.model({
    communityData: types.maybeNull(HomeSchema.CommunityPaginated),
    postInIdHomeData: types.maybeNull(HomeSchema.PostInIdHomeDataSchema),
})
    .extend(withEnvironment)
    .actions((self) => ({
        getCommunity: flow(function* () {
            const response = yield self.environment.api.call(API_ENDPOINTS.getHomeCommunities, {
            });

            switch (response.status) {
                case 200:
                    self.communityData = HomeSchema.CommunityPaginated.create(response.data);
                    return ACTION_RESPONSES.success;
                case 400:
                    return ACTION_RESPONSES.failure;
                default:
                    console.error('UNHANDLED ERROR');
                    break;
            }

            return ACTION_RESPONSES.failure;
        }),

        getPostInIdHomeData: flow(function* () {
            const response = yield self.environment.api.call(API_ENDPOINTS.getHomeCommunities);
            console.log('responseHomeData', response);
            switch (response.status) {
                case 200:
                    console.log('Response Data:', response.data);
                    self.postInIdHomeData = HomeSchema.PostInIdHomeDataSchema.create({
                        ...response.data,
                        results: response.data.results.map((result: any) => ({
                            ...result,
                            // community: result.community ? result.community.id : null, // or any other field from the community object you want to keep
                        })),
                    });
                    return ACTION_RESPONSES.success;
                case 400:
                    return ACTION_RESPONSES.failure;
                default:
                    console.error('UNHANDLED ERROR');
                    return ACTION_RESPONSES.failure;
            }
        }),

    }));
