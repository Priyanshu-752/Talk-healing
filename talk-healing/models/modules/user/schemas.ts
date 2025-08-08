import { Instance, types } from 'mobx-state-tree';
import { BaseModelSchemaBase, PaginatedSchemaBase } from '../../api/endpoint.types';

// user schema
export const User = types.model({
  ...BaseModelSchemaBase,
  email: types.maybeNull(types.string),
  is_phone_verified: types.maybeNull(types.boolean),
  phone: types.maybeNull(types.string),
  avatar: types.maybeNull(types.string),
  last_login: types.maybeNull(types.string),
  full_name: types.maybeNull(types.string),
  is_email_verified: types.maybeNull(types.boolean),
});
export interface UserType extends Instance<typeof User> { }

export const UserPaginated = types.model({
  ...PaginatedSchemaBase,
  results: types.maybeNull(types.array(User)),
});
export interface UserPaginatedType extends Instance<typeof UserPaginated> { }

export const LoggedInUser = types.model({
  user: types.maybeNull(User),
  access: types.maybeNull(types.string),
  refresh: types.maybeNull(types.string),
});

export interface LoggedInUserType extends Instance<typeof LoggedInUser> { }
export const Registration = types.model({
  ...BaseModelSchemaBase,
  email: types.maybeNull(types.string),
  password: types.maybeNull(types.string),
  confirmpassword: types.maybeNull(types.string),
  full_name: types.maybeNull(types.string),
  is_created_by_admin: types.maybeNull(types.boolean),
  groups: types.maybeNull(types.array(types.string)),
  phone: types.maybeNull(types.string),
  avatar: types.maybeNull(types.string),
});
export interface RegistrationType extends Instance<typeof Registration> { }

export const RegistrationPaginated = types.model({
  ...PaginatedSchemaBase,
  results: types.maybeNull(types.array(Registration)),
});
export interface RegistrationPaginatedType extends Instance<typeof RegistrationPaginated> { }

export const Login = types.model({
  ...BaseModelSchemaBase,
  email: types.maybeNull(types.string),
  password: types.maybeNull(types.string),
});

export interface LoginType extends Instance<typeof Login> { }

export const Password = types.model({
  ...BaseModelSchemaBase,
  old_password: types.maybeNull(types.string),
  new_password1: types.maybeNull(types.string),
  new_password2: types.maybeNull(types.string),
  email: types.maybeNull(types.string),
  uid: types.maybeNull(types.string),
  token: types.maybeNull(types.string),
});

export interface PasswordType extends Instance<typeof Password> { }

export const resetPasswordToken = types.model({
  token: types.string,
  uid: types.string,
});
export interface resetPasswordTokenType extends Instance<typeof resetPasswordToken> { }
