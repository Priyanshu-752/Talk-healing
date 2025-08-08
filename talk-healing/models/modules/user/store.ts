import { types, flow } from 'mobx-state-tree';
import * as storage from 'localforage';
import { withEnvironment } from '../../extensions/with-environment';
import { ACTION_RESPONSES } from '../../api/endpoint.types';
import * as UserSchemas from './schemas';
import { API_ENDPOINTS } from './endpoints';

export const UserStore = types
  .model({
    loggedInUserData: types.maybeNull(UserSchemas.LoggedInUser),
    userData: types.maybeNull(UserSchemas.User),
    is_logged_in: types.maybeNull(types.boolean),
    remember_me: types.maybeNull(types.boolean),
    isLoggedInUser: types.maybeNull(types.boolean),
    verfyEmailData: types.maybeNull(UserSchemas.LoggedInUser),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    // Example placeholder action, add real ones as needed
 loginUser: flow(function* (email: string, password: string) {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.loginUser,
        {
          email,
          password,
        }
      );
      console.log('---40 userstore', JSON.stringify(response.data.user, null, 2));
      switch (response.status) {
        case 200:
          self.loggedInUserData = null;
          yield storage.clear();
          self.is_logged_in = true;
          self.loggedInUserData = UserSchemas.LoggedInUser.create(
            response.data
          );
          yield storage.setItem(
            self.environment.api.config.token_key,
            response.data[self.environment.api.config.token_key]
          );
          return ACTION_RESPONSES.success;
        case 400:
          return {
            ...ACTION_RESPONSES.failure, code: response.status, error: response.data,
          };
        case 401:
          return { ...ACTION_RESPONSES.failure, code: response.status, error: response.data };
        case 500:
          return ACTION_RESPONSES.failure;
        default:
          console.error('UNHANDLED ERROR');
          return ACTION_RESPONSES.success;
      }
    }),
  }));
