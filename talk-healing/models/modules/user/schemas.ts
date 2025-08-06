import { Instance, types } from 'mobx-state-tree';
import { BaseModelSchemaBase, PaginatedSchemaBase } from '../../api/endpoint.types';


// user schema
export const User = types.model({
  ...BaseModelSchemaBase,
  email: types.string,
  full_name: types.string,
  phone: types.maybeNull(types.string),
  is_email_verified: types.boolean,
  date_of_birth: types.maybeNull(types.string),
  

});

export interface UserType extends Instance<typeof User> { }

// logged in user schema
export const LoggedInUser = types.model({
  user: User,
  access: types.maybeNull(types.string),
  refresh: types.maybeNull(types.string),
});

export interface LoggedInUserType extends Instance<typeof LoggedInUser> { }

export const UserPaginated = types.model({
  ...PaginatedSchemaBase,
  results: types.array(User),
});
export interface UserPaginatedType extends Instance<typeof UserPaginated> { }

export const LoggedInUserPaginated = types.model({
  ...PaginatedSchemaBase,
  results: types.array(LoggedInUser),
});
export interface LoggedInUserPaginatedType extends Instance<typeof LoggedInUserPaginated> { }
export const TermsOfUse = types.model({
  // ...BaseModelSchemaBase,
  privacy_policy: types.identifier,
  terms_of_use: types.string,
  agree_conditions: types.array(types.string),

});
export const Action = types.model({
  // ...BaseModelSchemaBase,
  label: types.string,
  target_external_url: types.string,
  target_internal_url: types.string,
});

export const Address = types.model({
  id: types.identifier,
  created_on: types.maybeNull(types.string),
  edited_on: types.maybeNull(types.string),
  _data: types.maybeNull(types.frozen()),
  address_line1: types.string,
 
});
export interface AddressType extends Instance<typeof Address> { }
export const AddressResults = types.model({
  ...PaginatedSchemaBase,
  results: types.array(Address),
});
export interface AddressPaginatedType extends Instance<typeof AddressResults> { }