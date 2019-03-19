export type ENVIRONMENT = 'localhost' | 'staging' | 'production';

export const PATHS = {
  CERTIFICATE_ISSUER: '/certificate-issuers',
  CERTIFICATE_TYPES: (issuer: string) => `${PATHS.CERTIFICATE_ISSUER}/${issuer}/certificate-types`,
  CERTIFICATE_TYPE: (id: string) => `/certificate-types/${id}`,
  DELETE_CERTIFICATE_TYPE: (issuer: string, id: string) => `${PATHS.CERTIFICATE_TYPES(issuer)}/${id}`,
  CERTIFICATES: (issuer: string) => `${PATHS.CERTIFICATE_ISSUER}/${issuer}/certificates`,
  CERTIFICATE: (id: string) => `/certificates/${id}`,
  TOKEN_ISSUERS: '/token-issuers',
  TOKEN_ISSUER: (id: string) => `${PATHS.TOKEN_ISSUERS}/${id}`,
  ASSETS: (issuer: string) => `${PATHS.TOKEN_ISSUER(issuer)}/assets`,
  ASSET: (issuer: string, id: string) => `${PATHS.TOKEN_ISSUER(issuer)}/assets/${id}`,
  KYA: (issuer: string, id: string) => `${PATHS.TOKEN_ISSUER(issuer)}/assets/${id}/kya`,
  ASSET_ASSOCIATOR: (issuer: string, asset: string, associator: string) => `${PATHS.ASSET(issuer, asset)}/associators/${associator}`,
  ASSOCIATORS: `/associators/`,
  ASSOCIATOR: (publicKey: string) => `/associators/${publicKey}`,
  ASSOCIATOR_REQUESTS: (publicKey: string) => `/associators/${publicKey}/requests`,
  ASSOCIATOR_REQUEST: (publicKey: string, id: string) => `${PATHS.ASSOCIATOR_REQUESTS(publicKey)}/${id}`
};
