import { statusHandlers } from '@/http/primary/statusHandlers';
import { AxiosRequestHeaders } from 'axios';
import Token from '@/common/ts/Token';
import { AxiosWrapper } from '@mxssfd/axios-wrapper';

/**
 * 主域名请求类
 */
export default class PrimaryRequest extends AxiosWrapper {
  static readonly ins = new PrimaryRequest();
  static readonly get = AxiosWrapper.methodFactory('get', PrimaryRequest.ins);
  static readonly post = AxiosWrapper.methodFactory('post', PrimaryRequest.ins);
  static readonly delete = AxiosWrapper.methodFactory('delete', PrimaryRequest.ins);
  static readonly patch = AxiosWrapper.methodFactory('patch', PrimaryRequest.ins);

  private constructor() {
    super({ baseURL: import.meta.env.VITE_BASE_URL }, { statusHandlers });
  }

  protected setInterceptors() {
    this.interceptors.request.use((config) => {
      if (!config.headers) config.headers = {};
      const headers = config.headers as AxiosRequestHeaders;
      Token.exists() && (headers.authorization = `Bearer ${Token.get()}`);
      // headers.uuid = getUUID();
      return config;
    });
  }
}
