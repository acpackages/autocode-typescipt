export const AcEnumHttpMethod = {
  CONNECT: 'connect',
  DELETE: 'delete',
  GET: 'get',
  HEAD: 'head',
  OPTIONS: 'options',
  PATCH: 'patch',
  POST: 'post',
  PUT: 'put',
  TRACE: 'trace',
} as const;

export type AcEnumHttpMethod = typeof AcEnumHttpMethod[keyof typeof AcEnumHttpMethod];
