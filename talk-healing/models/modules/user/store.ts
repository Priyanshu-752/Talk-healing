// models/modules/user/store.ts
import { types, flow } from 'mobx-state-tree';
import { storage } from '../../utils/storage';
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
    signupUser: flow(function* (full_name: string, email: string, password1: string,password2: string) {
      try {
        console.log('UserStore: Starting signup with payload:', { full_name, email, password1: '***' });
        
        const payload = {
          full_name,
          email,
          password1,
          password2: password1, // align with your Registration model
        };

        console.log('UserStore: Making API call to registration endpoint...');
        const response = yield self.environment.api.call(API_ENDPOINTS.registration, payload);
        
        console.log('UserStore: Raw API response:', {
          status: response.status,
          ok: response.ok,
          data: response.data,
          problem: response.problem
        });

        switch (response.status) {
          case 201:
          case 200:
            console.log('UserStore: Signup successful, response data:', response);
            // Return success with the actual response data containing tokens and user info
            return { 
              response: response,
              access: response.data.access,
              refresh: response.data.refresh,
              ok: true,
              error: null,
              code: response.status,
              message: null,
              data: response.data 
            };
          case 400:
          case 422:
            console.log('UserStore: Signup failed with validation error:', response.data);
            return { ...ACTION_RESPONSES.failure, code: response.status, error: response.data };
          default:
            console.log('UserStore: Signup failed with status:', response.status);
            return { ...ACTION_RESPONSES.failure, code: response.status };
        }
      } catch (e: any) {
        console.error('UserStore: Exception during signup:', e);
        return { ...ACTION_RESPONSES.failure, error: e?.message || 'Sign up failed' };
      }
    }),

    // LOGIN
    loginUser: flow(function* (email: string, password: string) {
      const response = yield self.environment.api.call(API_ENDPOINTS.loginUser, { email, password });
      console.log("hittttttt", response)      

      switch (response.status) {
        case 200:
          self.loggedInUserData = null;
          
          // Clear storage
          try {
            yield storage.clear();
          } catch (error) {
            console.warn('Failed to clear storage:', error);
          }

          self.is_logged_in = true;
          self.loggedInUserData = UserSchemas.LoggedInUser.create(response.data);

          // Persist token if present
          const tokenKey = self.environment.api.config.token_key;
          if (tokenKey && response.data && response.data[tokenKey]) {
            try {
              yield storage.setItem(tokenKey, response.data[tokenKey]);
            } catch (error) {
              console.warn('Failed to save token:', error);
            }
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
          
          // Clear storage
          try {
            yield storage.clear();
          } catch (error) {
            console.warn('Failed to clear storage during logout:', error);
          }
          
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

    verifyEmailOtp: flow(function* (email: string, otp: string) {
      try {
        const response = yield self.environment.api.call(
          API_ENDPOINTS.verifyEmail,
          { 
            email: email,
            otp: otp 
          }
        );

        switch (response.status) {
          case 200:
            console.log('OTP verification successful');
            return ACTION_RESPONSES.success;
          case 400:
            console.error('OTP verification failed: Bad data');
            return { ...ACTION_RESPONSES.failure, code: response.status, error: response.data };
          case 404:
            return { ...ACTION_RESPONSES.failure, code: response.status, error: response.data };
          default:
            console.error('UNHANDLED ERROR', response);
            return ACTION_RESPONSES.failure;
        }
      } catch (error) {
        console.error('OTP verification error:', error);
        return ACTION_RESPONSES.failure;
      }
    }),

    resendOtp: flow(function* (email: string) {
      try {
        const response = yield self.environment.api.call(
          API_ENDPOINTS.resendVerificationEmail,
          { email: email }
        );

        switch (response.status) {
          case 200:
            console.log('OTP resent successfully');
            return ACTION_RESPONSES.success;
          case 400:
            console.error('OTP resend failed: Bad data');
            return { ...ACTION_RESPONSES.failure, code: response.status, error: response.data };
          default:
            console.error('UNHANDLED ERROR', response);
            return ACTION_RESPONSES.failure;
        }
      } catch (error) {
        console.error('OTP resend error:', error);
        return ACTION_RESPONSES.failure;
      }
    }),

    // TOKEN MANAGEMENT
    setTokens: (accessToken: string, refreshToken: string) => {
      // Store tokens in the API configuration for future requests
      if (accessToken) {
        storage.setItem(self.environment.api.config.token_key, accessToken);
      }
      
      // Also store refresh token if needed
      if (refreshToken) {
        storage.setItem('refresh_token', refreshToken);
      }
      
      console.log('Tokens set in store');
    },

    setUser: (userData: any) => {
      try {
        // Set user data in the store if available
        if (userData) {
          self.loggedInUserData = UserSchemas.LoggedInUser.create({
            user: userData,
            access: '', // We'll set this separately
            refresh: '' // We'll set this separately
          });
          self.is_logged_in = true;
          
          console.log('User data set in store:', userData);
        }
      } catch (error) {
        console.error('Error setting user data in store:', error);
      }
    },

    // Initialize tokens and user data from storage on app start
    initializeFromStorage: flow(function* () {
      try {
        const accessToken = yield storage.getItem(self.environment.api.config.token_key);
        const refreshToken = yield storage.getItem('refresh_token');
        
        if (accessToken) {
          // Set the authorization header for future API calls
          self.environment.api.apisauce.setHeader("Authorization", "Bearer " + accessToken);
          console.log('Initialized access token from storage');
        }
        
        if (refreshToken) {
          console.log('Initialized refresh token from storage');
        }
        
        // If we have tokens, we're likely logged in
        if (accessToken) {
          self.is_logged_in = true;
        }
        
        return { success: true };
      } catch (error) {
        console.error('Error initializing from storage:', error);
        return { success: false, error };
      }
    }),
  }));

