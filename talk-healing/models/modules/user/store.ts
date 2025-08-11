// models/modules/user/store.ts
import { types, flow } from 'mobx-state-tree';
import * as storage from 'localforage';
import { withEnvironment } from '../../extensions/with-environment';
import { ACTION_RESPONSES } from '../../api/endpoint.types';
import * as UserSchemas from './schemas';
import { API_ENDPOINTS } from './endpoints';

export const UserStore = types
  .model('UserStore', {
    loggedInUserData: types.maybeNull(UserSchemas.LoggedInUser),
    userData: types.maybeNull(UserSchemas.User),
    is_logged_in: types.maybeNull(types.boolean),
    remember_me: types.maybeNull(types.boolean),
    isLoggedInUser: types.maybeNull(types.boolean),
    verfyEmailData: types.maybeNull(UserSchemas.LoggedInUser),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    // REGISTER / SIGN UP
    registerUser: flow(function* (full_name: string, email: string, password: string) {
      try {
        const payload = {
          full_name,
          email,
          password,
          confirmpassword: password, // align with your Registration model
        };

        const response = yield self.environment.api.call(API_ENDPOINTS.registration, payload);

        switch (response.status) {
          case 201:
          case 200:
            // If your API returns tokens and user, you can hydrate here like login:
            // self.loggedInUserData = UserSchemas.LoggedInUser.create(response.data);
            // self.is_logged_in = true;
            // yield storage.setItem(self.environment.api.config.token_key, response.data[self.environment.api.config.token_key]);
            return ACTION_RESPONSES.success; // { ok: true }
          case 400:
          case 422:
            return { ...ACTION_RESPONSES.failure, code: response.status, error: response.data };
          default:
            return ACTION_RESPONSES.failure;
        }
      } catch (e: any) {
        return { ...ACTION_RESPONSES.failure, error: e?.message || 'Sign up failed' };
      }
    }),

    // LOGIN
    loginUser: flow(function* (email: string, password: string) {
      const response = yield self.environment.api.call(API_ENDPOINTS.loginUser, { email, password });

      switch (response.status) {
        case 200:
          self.loggedInUserData = null;
          yield storage.clear();

          self.is_logged_in = true;
          self.loggedInUserData = UserSchemas.LoggedInUser.create(response.data);

          // Persist token if present
          const tokenKey = self.environment.api.config.token_key;
          if (tokenKey && response.data && response.data[tokenKey]) {
            yield storage.setItem(tokenKey, response.data[tokenKey]);
          }

          return ACTION_RESPONSES.success; // { ok: true }
        case 400:
        case 401:
          return { ...ACTION_RESPONSES.failure, code: response.status, error: response.data };
        case 500:
          return ACTION_RESPONSES.failure;
        default:
          return ACTION_RESPONSES.failure;
      }
    }),

    // LOGOUT
    logoutUser: flow(function* () {
      try {
        const response = yield self.environment.api.call(API_ENDPOINTS.logoutUser, {});
        if (response.status === 200 || response.status === 204) {
          self.loggedInUserData = null;
          self.is_logged_in = false;
          yield storage.clear();
          return ACTION_RESPONSES.success;
        }
        return { ...ACTION_RESPONSES.failure, code: response.status, error: response.data };
      } catch (e: any) {
        return { ...ACTION_RESPONSES.failure, error: e?.message || 'Logout failed' };
      }
    }),

    // PASSWORD: CHANGE
    changePassword: flow(function* (old_password: string, new_password1: string, new_password2: string) {
      try {
        const response = yield self.environment.api.call(API_ENDPOINTS.passwordChange, {
          old_password,
          new_password1,
          new_password2,
        });
        if (response.status === 200) return ACTION_RESPONSES.success;
        return { ...ACTION_RESPONSES.failure, code: response.status, error: response.data };
      } catch (e: any) {
        return { ...ACTION_RESPONSES.failure, error: e?.message || 'Password change failed' };
      }
    }),

    // PASSWORD: RESET REQUEST (send email)
    requestPasswordReset: flow(function* (email: string) {
      try {
        const response = yield self.environment.api.call(API_ENDPOINTS.passwordResetRequest, { email });
        if (response.status === 200) return ACTION_RESPONSES.success;
        return { ...ACTION_RESPONSES.failure, code: response.status, error: response.data };
      } catch (e: any) {
        return { ...ACTION_RESPONSES.failure, error: e?.message || 'Reset request failed' };
      }
    }),

    // PASSWORD: VERIFY EMAIL OTP (if used in your flow)
    verifyResetEmailOtp: flow(function* (email: string, otp: string) {
      try {
        const response = yield self.environment.api.call(API_ENDPOINTS.passwordResetVerify, { email, otp });
        if (response.status === 200) return ACTION_RESPONSES.success;
        return { ...ACTION_RESPONSES.failure, code: response.status, error: response.data };
      } catch (e: any) {
        return { ...ACTION_RESPONSES.failure, error: e?.message || 'OTP verification failed' };
      }
    }),

    // PASSWORD: RESET CONFIRM (complete reset with uid/token)
    confirmPasswordReset: flow(function* (uid: string, token: string, new_password1: string, new_password2: string) {
      try {
        const response = yield self.environment.api.call(API_ENDPOINTS.resetPasswordConfirm, {
          uid,
          token,
          new_password1,
          new_password2,
        });
        if (response.status === 200) return ACTION_RESPONSES.success;
        return { ...ACTION_RESPONSES.failure, code: response.status, error: response.data };
      } catch (e: any) {
        return { ...ACTION_RESPONSES.failure, error: e?.message || 'Reset confirm failed' };
      }
    }),
  }));
