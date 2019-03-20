import axios from 'axios';
import { Provider } from './provider';
import CONF from './conf';

export interface Headers {
  'x-map-api-key'?: string;
  'x-map-signature'?: string;
  'x-map-key-type'?: string;
}

export class Client {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor(provider: Provider) {
    this.baseUrl = provider.baseUrl;
    this.apiKey = CONF.apiKey;
  }

  private dispatchAxiosRequest<T>(method: string, path: string, headers?: Headers, payload?: T) {
    headers = {...headers, 'x-map-api-key': this.apiKey};

    return axios({
      method: method,
      url: this.baseUrl + path,
      headers: headers,
      data: payload,
    }).then((response) => {
      return Promise.resolve(response.data);
    })
      .catch((error) => {
        return Promise.reject(error.response.data);
      });
  }

  post<T>(path: string, payload: T, headers?: Headers): Promise<T> {
    return this.dispatchAxiosRequest('POST', path, headers, payload);
  }

  get<T>(path: string, headers?: Headers): Promise<T> {
    return this.dispatchAxiosRequest('GET', path, headers);
  }

  put<T>(path: string, payload: T, headers?: Headers): Promise<T> {
    return this.dispatchAxiosRequest('PUT', path, headers, payload);
  }

  delete(path: string, headers: Headers): Promise<void> {
    return this.dispatchAxiosRequest('DELETE', path, headers);
  }
}
