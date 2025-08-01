export const PAGINATION_TEST = {
  count: expect.any(Number),
  results: expect.toBeArray(),
  next: expect.toBeOneOf([expect.any(String), null]),
  previous: expect.toBeOneOf([expect.any(String), null]),
}
export const BASE_MODEL_TEST = {
  id: expect.any(String),
  created_on: expect.any(Date),
  edited_on: expect.any(Date),
  //_data:expect.toBeOneOf([[expect.anything(), null,undefined]])
}
