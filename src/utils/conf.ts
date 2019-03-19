import { AuthExpirationTimeUnit, Options } from './provider';

class Conf implements Options {
  apiKey: string = '';
  authExpirationTime: number = 5;
  authExpirationTimeUnit: AuthExpirationTimeUnit = 'm';
}

const CONF = new Conf();
export default CONF;
