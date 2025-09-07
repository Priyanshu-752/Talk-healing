import { Instance, types } from "mobx-state-tree"
import { PaginatedSchemaBase, BaseModelSchemaBase } from "../../api/endpoint.types"

// Settings schema 
export const Settings = types.model({
  ...BaseModelSchemaBase,
  sms_notification: types.boolean,
  email_notification: types.boolean,
  push_notification: types.boolean,
  user: types.string,
})
export interface SettingsType extends Instance<typeof Settings> { }

// Faq schema 
export const FAQ = types.model({
  id: types.identifier,
  question: types.string,
  answer: types.string
})
export interface FAQType extends Instance<typeof FAQ> { }

export const FAQPaginated = types.model({
  ...PaginatedSchemaBase,
  results: types.array(FAQ),
})
export interface FAQPaginatedType extends Instance<typeof FAQPaginated> { }