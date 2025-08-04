import { types, Instance } from "mobx-state-tree";
import { BaseModelSchemaBase, PaginatedSchemaBase } from '../../api/endpoint.types';

// Login Model
export const LoginModel = types.model("LoginModel", {
  email: types.string,
  password: types.string,
});
export type LoginModelType = Instance<typeof LoginModel>;

// Signup Model
export const SignUpModel = types.model("SignUpModel", {
  name: types.string,
  email: types.string,
  password: types.string,
  confirmPassword: types.string,
});
export type SignUpModelType = Instance<typeof SignUpModel>;

// Forgot Password Model
export const ForgotPasswordModel = types.model("ForgotPasswordModel", {
  email: types.string,
});
export type ForgotPasswordModelType = Instance<typeof ForgotPasswordModel>;
