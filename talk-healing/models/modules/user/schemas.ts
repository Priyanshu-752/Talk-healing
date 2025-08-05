import { Instance, types } from 'mobx-state-tree';
import { BaseModelSchemaBase, PaginatedSchemaBase } from '../../api/endpoint.types';

export const ReferralSource = types.model({
  // ...BaseModelSchemaBase,
  id: types.identifier,
  name: types.string,
  description: types.maybeNull(types.string),
});
export interface ReferralSource extends Instance<typeof ReferralSource> { }

export const ReferralSourcePaginated = types.model({
  ...PaginatedSchemaBase,
  results: types.array(ReferralSource),
});
export interface ReferralSourcePaginated extends Instance<typeof ReferralSourcePaginated> { }

export const Avatar = types.model({
  id: types.identifier,
  created_on: types.maybeNull(types.string),
  edited_on: types.maybeNull(types.string),
  avatar: types.maybeNull(types.string),
  order: types.maybeNull(types.number),
});
export interface Avatar extends Instance<typeof Avatar> { }

export const AvatarPaginated = types.model({
  ...PaginatedSchemaBase,
  results: types.array(Avatar),
});
export interface AvatarPaginated extends Instance<typeof AvatarPaginated> { }

export const GENDERS = {
  MALE: 'Male',
  FEMALE: 'Female',
};


// user schema
export const User = types.model({
  ...BaseModelSchemaBase,
  email: types.string,
  full_name: types.string,
  avatar: types.string,
  phone: types.maybeNull(types.string),
  is_terms_agreed: types.boolean,
  is_phone_verified: types.boolean,
  is_email_verified: types.boolean,
  date_of_birth: types.maybeNull(types.string),
  status: types.string,
  last_login: types.string,
  // posts: types.maybeNull(types.string),
  // created_on: types.maybeNull(types.string), // Allow null values
  // following: types.integer,
  // followers: types.integer,
  gender: types.maybeNull(types.enumeration(Object.values(GENDERS))),
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
  address_line2: types.string,
  city: types.string,
  state: types.string,
  country: types.string,
  postal_code: types.string,
});
export interface AddressType extends Instance<typeof Address> { }
export const AddressResults = types.model({
  ...PaginatedSchemaBase,
  results: types.array(Address),
});
export interface AddressPaginatedType extends Instance<typeof AddressResults> { }

