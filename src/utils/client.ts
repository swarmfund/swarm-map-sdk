import axios from 'axios';
import { Provider } from './provider';
import CONF from './conf';

export class Client {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor(provider: Provider) {
    this.baseUrl = provider.baseUrl;
    this.apiKey = CONF.apiKey;
  }

  private dispatchAxiosRequest<T>(method: string, path: string, headers: any = {}, payload?: T) {
    headers = {...headers, 'api-key': this.apiKey};

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

  post(path: string, payload: any, headers?: any) {
    return this.dispatchAxiosRequest('POST', path, headers, payload);
  }

  get(path: string, headers?: any) {
    return this.dispatchAxiosRequest('GET', path, headers);
  }

  put(path: string, payload: any, headers?: any) {
    return this.dispatchAxiosRequest('PUT', path, headers, payload);
  }

  delete(path: string, headers: any) {
    return this.dispatchAxiosRequest('DELETE', path, headers);
  }
}
