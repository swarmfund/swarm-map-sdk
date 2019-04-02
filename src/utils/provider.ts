import { ENVIRONMENT } from './const';
import CONF from './conf';

export type AuthExpirationTimeUnit = 'm' | 's' | 'h';

export interface Options {
  port?: number;
  authExpirationTime?: number;
  authExpirationTimeUnit?: AuthExpirationTimeUnit;
}

export class Provider {
  environment: ENVIRONMENT | string;
  baseUrl: string;

  constructor(environment: ENVIRONMENT | string, apiKey: string, options?: Options) {
    if (!environment) {
      throw new Error('Please provider environment property. Could be production, staging or localhost.');
    }

    this.environment = environment;

    if (!apiKey) {
      throw new Error('Please provider api key.');
    }

    CONF.apiKey = apiKey;

    if (options) {
      const {authExpirationTime, authExpirationTimeUnit} = options;

      if (authExpirationTimeUnit) {
        CONF.authExpirationTimeUnit = authExpirationTimeUnit;
      }

      if (authExpirationTime) {
        CONF.authExpirationTime = authExpirationTime;
      }
    }

    if (environment === 'production') {
      this.baseUrl = '...';
    } else if (environment === 'staging') {
      this.baseUrl = 'https://staging.swarm-map.mvpworkshop.co/api';
    } else if (environment === 'sandbox') {
      this.baseUrl = 'https://sandbox.swarm.fund/api';
    } else {
      let port: number = 3000;

      if (options && options.port) {
        port = options.port;
      }

      this.baseUrl = `http://localhost:${port}/api`;
    }
  }
}
