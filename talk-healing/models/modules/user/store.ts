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
      // Implement your login logic here (API call, update self fields, etc.)
      // Example:
      // yield self.environment.api.login(email, password);
      // self.is_logged_in = true; // Example only
    }),
  }));
