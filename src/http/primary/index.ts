import { statusHandlers } from '@/http/primary/statusHandlers';
import { AxiosRequestHeaders } from 'axios';
import Token from '@/common/ts/Token';
import { AxiosRequestTemplate } from 'request-template';

/**
 * 主域名请求类
 */
export default class PrimaryRequest extends AxiosRequestTemplate {
  static readonly ins = new PrimaryRequest();
  static readonly get = PrimaryRequest.ins.simplifyMethodFactory('get');
  static readonly post = PrimaryRequest.ins.simplifyMethodFactory('post');
  static readonly delete = PrimaryRequest.ins.simplifyMethodFactory('delete');
  static readonly patch = PrimaryRequest.ins.simplifyMethodFactory('patch');

  private constructor() {
    super({
      requestConfig: { baseURL: import.meta.env.VITE_BASE_URL },
      customConfig: { statusHandlers },
    });
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
