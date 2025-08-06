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
      isLoggedInUser: types.maybeNull(types.boolean),
    verfyEmailData: types.maybeNull(UserSchemas.LoggedInUser),
    isLoading: types.optional(types.boolean, false),
    error: types.optional(types.string, ''),
      })
        .extend(withEnvironment)
  .actions((self) => ({
    getUserLoggedInStatus: flow(function* (userLogin: boolean) {
      self.isLoggedInUser = userLogin;
      return true;
    }),
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
    logoutUser: flow(function* () {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.logoutuser
      );
      switch (response.status) {
        case 204:
        case 200:
          yield storage.removeItem(self.environment.api.config.token_key);
          yield storage.clear();
          self.is_logged_in = false;
          self.loggedInUserData = null;
          return ACTION_RESPONSES.success;
        default:
          console.error('UNHANDLED ERROR');
          break;
      }
      return ACTION_RESPONSES.failure;
    }),
      signupUser: flow(function* (
      email: string,
      full_name: string,
      password1: string,
      password2: string,
     
    ) {
      storage.clear();
      self.is_logged_in = false;
      const response = yield self.environment.api.call(
        API_ENDPOINTS.registerUser,
        {
          email,
          full_name,
          password1,
          password2,
        
        }
      );
      const error = null;
      switch (response.status) {
        case 201:
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
        default:
          console.error('UNHANDLED ERROR');
          break;
      }
      return ACTION_RESPONSES.failure;
    }),
    verifyEmail: flow(function* (otp: string) {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.verifyEmail,
        {
          otp,
        }
      );
      switch (response.status) {
        case 200:
          return ACTION_RESPONSES.success;
        case 400:
          return ACTION_RESPONSES.failure;
        case 404:
          return { ...ACTION_RESPONSES.failure, code: response.status, error: response.data };
        default:
          console.error('UNHANDLED ERROR');
          break;
      }
      return ACTION_RESPONSES.failure;
    }),
  }));