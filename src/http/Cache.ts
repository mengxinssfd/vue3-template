import { AxiosRequestConfig } from 'axios';
import { CustomConfig } from '@/http/types';

export default class Cache {
  private readonly cache = new Map<string, { value: Promise<any>; expires: number }>();

  private configToKey(config: AxiosRequestConfig): string {
    const url = config.url;
    const data = config.data || config.params;
    const headers = config.headers;
    return JSON.stringify({ url, data, headers });
  }

  get(key: AxiosRequestConfig) {
    const k = this.configToKey(key);
    const v = this.cache.get(k);
    if (!v) return null;
    const now = Date.now();
    if (now > v.expires) {
      this.cache.delete(k);
      return null;
    }
    return v.value;
  }
  set(key: AxiosRequestConfig, value: Promise<any>, customConfig: CustomConfig = {}) {
    const defaultTimeout = 5 * 1000;
    const timeout =
      typeof customConfig.useCache === 'object' ? customConfig.useCache?.timeout : defaultTimeout;
    this.cache.set(this.configToKey(key), { value, expires: timeout + Date.now() });
  }
  has(key: AxiosRequestConfig): boolean {
    return this.get(key) !== null;
  }
}
