/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import { flow, types } from 'mobx-state-tree';
import { ACTION_RESPONSES } from '../../api/endpoint.types';
import { withEnvironment } from '../../extensions/with-environment';
import { API_ENDPOINTS } from './endpoints';
import * as CommunitySchema from './schemas';

export const CommunityStore = types.model({
    communityData: types.maybeNull(CommunitySchema.CommunityPaginated),
    communityPostedData: types.maybeNull(CommunitySchema.CommunityPaginatedContent),
    postInCommunityData: types.maybeNull(CommunitySchema.PostInCommunityContentSchema),
    postInCommunityMedia: types.maybeNull(CommunitySchema.PostInCommunityMediaSchema),
    postedCommunity: types.maybeNull(CommunitySchema.CommunityPostMediaSchema),
    idCommunityData: types.maybeNull(CommunitySchema.IdCommunityDataSchema),
    postedCommunityMmeber: types.maybeNull(CommunitySchema.PostCommunityMemberSchema),
    feedComments: types.maybeNull(CommunitySchema.CommentPaginatedSchema),
    idFeedData: types.maybeNull(CommunitySchema.CommentSchema),
    postInIdCommunityData: types.maybeNull(CommunitySchema.PostInIdCommunityDataSchema),
})
    .extend(withEnvironment)
    .actions((self) => ({
        getCommunity: flow(function* () {
            const response = yield self.environment.api.call(API_ENDPOINTS.getCommunities, {
            });

            switch (response.status) {
                case 200:
                    self.communityData = CommunitySchema.CommunityPaginated.create(response.data);
                    return ACTION_RESPONSES.success;
                case 400:
                    return ACTION_RESPONSES.failure;
                default:
                    console.error('UNHANDLED ERROR');
                    break;
            }

            return ACTION_RESPONSES.failure;
        }),

        postCommunity: flow(function* (data: FormData) {
            const response = yield self.environment.api.call(API_ENDPOINTS.postCommunity, data, {}, {
                'Content-Type': 'multipart/form-data',
            });
            switch (response.status) {
                case 201:
                    self.postedCommunity = CommunitySchema.CommunityPostMediaSchema.create(response.data);
                    return ACTION_RESPONSES.success;
                case 400:
                    return ACTION_RESPONSES.failure;
                default:
                    console.error('UNHANDLED ERROR');
                    break;
            }

            return ACTION_RESPONSES.failure;
        }),

        getPostInIdCommunityData: flow(function* () {
            const response = yield self.environment.api.call(API_ENDPOINTS.getCommunityContent);
            switch (response.status) {
              case 200:
                console.log('Response Data:', response.data);
                try {
                    console.log('Validated Data:', self.postInIdCommunityData); // Add this line
                  self.postInIdCommunityData = CommunitySchema.PostInIdCommunityDataSchema.create(response.data);
                  return ACTION_RESPONSES.success;
                } catch (error) {
                  console.error('Schema validation failed:', error); // Already in place
                  return ACTION_RESPONSES.failure;
                }
              case 400:
                return ACTION_RESPONSES.failure;
              default:
                console.error('UNHANDLED ERROR');
                return ACTION_RESPONSES.failure;
            }
          }),

        postInCommunityContent: flow(function* (data: { [key: string]: any }) {
            const response = yield self.environment.api.call(API_ENDPOINTS.postInCommunity, data);
            switch (response.status) {
                case 201:
                    self.postInCommunityData = CommunitySchema.PostInCommunityContentSchema.create(response.data);
                    return ACTION_RESPONSES.success;
                case 400:
                    return ACTION_RESPONSES.failure;
                default:
                    console.error('UNHANDLED ERROR');
                    break;
            }

            return ACTION_RESPONSES.failure;
        }),

        createPostInCommunityMedia: flow(function* (data: FormData) {
            const response = yield self.environment.api.call(API_ENDPOINTS.postInCommunityMedia, data, {}, {
                'Content-Type': 'multipart/form-data',
            });
            switch (response.status) {
                case 201:
                    self.postInCommunityMedia = CommunitySchema.PostInCommunityMediaSchema.create(response.data);
                    return ACTION_RESPONSES.success;
                case 400:
                    return ACTION_RESPONSES.failure;
                default:
                    console.error('UNHANDLED ERROR');
                    break;
            }

            return ACTION_RESPONSES.failure;
        }),

        getCommunityPostedData: flow(function* () {
            const response = yield self.environment.api.call(API_ENDPOINTS.getCommunityContent);

            switch (response.status) {
                case 200:
                    self.communityPostedData = CommunitySchema.CommunityPaginatedContent.create(response.data);
                    return ACTION_RESPONSES.success;
                case 400:
                    return ACTION_RESPONSES.failure;
                default:
                    console.error('UNHANDLED ERROR');
                    break;
            }

            return ACTION_RESPONSES.failure;
        }),

        getIdSpecificCommunity: flow(function* (id: string) {
            const response = yield self.environment.api.call(API_ENDPOINTS.getIDCommunity, {}, { id });
            switch (response.status) {
                case 200:
                    self.idCommunityData = CommunitySchema.IdCommunityDataSchema.create(response.data);
                    return ACTION_RESPONSES.success;
                case 400:
                    return ACTION_RESPONSES.failure;
                default:
                    console.error('UNHANDLED ERROR');
                    break;
            }

            return ACTION_RESPONSES.failure;
        }),

        createCommunityMember: flow(function* (communityId: string, memberId: string) {
            const response = yield self.environment.api.call(API_ENDPOINTS.postCommunityMember, { community: communityId, member: memberId }, {});
            switch (response.status) {
                case 201:
                    self.postedCommunityMmeber = CommunitySchema.PostCommunityMemberSchema.create(response.data);
                    return ACTION_RESPONSES.success;
                case 400:
                    return ACTION_RESPONSES.failure;
                default:
                    console.error('UNHANDLED ERROR');
                    break;
            }

            return ACTION_RESPONSES.failure;
        }),

        postCommentFeed: flow(function* (data: Record<string, string>) {
            const response = yield self.environment.api.call(API_ENDPOINTS.postComment, data, {});
            switch (response.status) {
                case 201:
                    return ACTION_RESPONSES.success;
                case 400:
                    return ACTION_RESPONSES.failure;
                default:
                    console.error('UNHANDLED ERROR');
                    break;
            }

            return ACTION_RESPONSES.failure;
        }),

        getCommentsFeed: flow(function* () {
            const response = yield self.environment.api.call(API_ENDPOINTS.getAllComments);
            switch (response.status) {
                case 200:
                    self.feedComments = CommunitySchema.CommentPaginatedSchema.create(response.data);
                    return ACTION_RESPONSES.success;
                case 400:
                    return ACTION_RESPONSES.failure;
                default:
                    console.error('UNHANDLED ERROR');
                    break;
            }

            return ACTION_RESPONSES.failure;
        }),
        getIdCommentFeed: flow(function* (id: string) {
            const response = yield self.environment.api.call(API_ENDPOINTS.getIdSpecificComment, {}, { id });
            switch (response.status) {
                case 200:
                    self.idFeedData = CommunitySchema.CommentSchema.create(response.data);
                    return ACTION_RESPONSES.success;
                case 400:
                    return ACTION_RESPONSES.failure;
                default:
                    console.error('UNHANDLED ERROR');
                    break;
            }

            return ACTION_RESPONSES.failure;
        }),

        postLikeDislike: flow(function* (data: Record<string, any>) {
            const response = yield self.environment.api.call(API_ENDPOINTS.likeDislikePost, data);
            // Find the post to update
            const postToUpdate = self.communityPostedData?.results.find((post) => post.id === data.post);
            // Handle like/dislike state
            const handleLikeDislikeState = (post: any) => {
              if (post) {
                if (data.reaction_type === 'Like') {
                    post.like_count += 1;
                } else if (data.reaction_type === 'Dislike') {
                  post.dislike_count += 1; // Increment dislike count
                }
              } else {
                console.error(`Post with ID ${data.post} not found!`); // Log error if post is not found
              }
            };
            switch (response.status) {
              case 201:
              case 200:
                if (postToUpdate) {
                  handleLikeDislikeState(postToUpdate); // Update like/dislike counts
                } else {
                  console.error('Post to update not found in state');
                }
                return ACTION_RESPONSES.success;
              case 400:
                return ACTION_RESPONSES.failure;
              default:
                console.error('UNHANDLED ERROR');
                throw new Error('Like/Dislike API failed');
            }
          }),
    }));
