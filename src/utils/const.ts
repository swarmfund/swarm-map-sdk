export type ENVIRONMENT = 'localhost' | 'staging' | 'sandbox' |'production';

export const PATHS = {
  CERTIFICATE_ISSUER: '/certificate-issuers',
  CERTIFICATE_TYPES: (id: string) => `${PATHS.CERTIFICATE_ISSUER}/${id}/certificate-types`,
  CERTIFICATE_TYPE: (id: string) => `/certificate-types/${id}`,
  DELETE_CERTIFICATE_TYPE: (issuer: string, id: string) => `${PATHS.CERTIFICATE_TYPES(issuer)}/${id}`,
  CERTIFICATES: (issuer: string) => `${PATHS.CERTIFICATE_ISSUER}/${issuer}/certificates`,
  CERTIFICATE: (id: string) => `/certificates/${id}`,
  FIND_CERTIFICATE: `/certificates`,
  TOKEN_ISSUERS: '/token-issuers',
  TOKEN_ISSUER: (id: string) => `${PATHS.TOKEN_ISSUERS}/${id}`,
  ASSETS: (issuer: string) => `${PATHS.TOKEN_ISSUER(issuer)}/assets`,
  ASSET: (issuer: string, id: string) => `${PATHS.TOKEN_ISSUER(issuer)}/assets/${id}`,
  KYA: (issuer: string, id: string) => `${PATHS.TOKEN_ISSUER(issuer)}/assets/${id}/kya`,
  ASSET_ASSOCIATOR: (issuer: string, asset: string, associator: string) => `${PATHS.ASSET(issuer, asset)}/associators/${associator}`,
  ASSOCIATORS: `/associators/`,
  ASSOCIATOR: (id: string) => `/associators/${id}`,
  ASSOCIATOR_REQUESTS: (id: string) => `/associators/${id}/requests`,
  ASSOCIATOR_REQUEST: (id: string, requestUid: string) => `${PATHS.ASSOCIATOR_REQUESTS(id)}/${requestUid}`,
  ASSOCIATOR_CERTIFICATES: (id: string) => `${PATHS.ASSOCIATOR(id)}/certificates`
};
