import Request from '@/http/Request';
import { statusHandlers } from '@/http/ins/primary/statusHandlers';
import { AxiosRequestHeaders } from 'axios';
import Token from '@/common/ts/Token';

/**
 * 主域名请求类
 */
export default class PrimaryRequest extends Request {
  static readonly ins = new PrimaryRequest();
  static readonly get = Request.methodFactory('get', PrimaryRequest.ins);
  static readonly post = Request.methodFactory('post', PrimaryRequest.ins);
  static readonly delete = Request.methodFactory('delete', PrimaryRequest.ins);
  static readonly patch = Request.methodFactory('patch', PrimaryRequest.ins);

  private constructor() {
    super({ baseURL: import.meta.env.VITE_BASE_URL }, { statusHandlers });
  }

  protected setInterceptors() {
    this.interceptors.request.use((value) => {
      const headers = value.headers as AxiosRequestHeaders;
      Token.exists() && (headers.authorization = `Bearer ${Token.get()}`);
      // headers.uuid = getUUID();
      return value;
    });
  }
}
