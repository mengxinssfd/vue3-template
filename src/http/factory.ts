import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import Qs from 'qs';
import type { ResType } from './types';

// RequestWrapper 请求封装
export function axiosFactory(
  ins: AxiosInstance,
  axiosConfig: AxiosRequestConfig,
  factoryCodeHandlers: StatusHandlers,
) {
  function request<T = never>(url: string, data?: {}): Promise<ResType<T>>;
  // 如果确定会返回AxiosResponse的话 第二个泛型必须是true => Get<any, true>(url,data,{returnRes:true})
  function request<T = never, RC extends boolean = false>(
    url: string,
    data: {},
    customConfig?: CustomConfig<RC>,
    requestAxiosConfig?: AxiosRequestConfig,
  ): Promise<RC extends true ? AxiosResponse<ResType<T>> : ResType<T>>;
  async function request(
    url: string,
    data = {},
    customConfig: CustomConfig<boolean> = {}, // 自定义配置
    requestAxiosConfig: AxiosRequestConfig = {}, // 请求级也必须是可以配置的，我可以不用，你不能没有
  ) {
    const finalConfig: AxiosRequestConfig = { ...axiosConfig, ...requestAxiosConfig, url };
    finalConfig.method = finalConfig.method || 'get';
    // get方式data赋值给params，其他method还是data不变
    // finalConfig[finalConfig.method === 'get' ? 'params' : 'data'] = data;
    if (finalConfig.method === 'get') {
      finalConfig.params = data;
    } else {
      if (!(data instanceof FormData)) {
        // 使用Qs.stringify处理过的数据不会有{}包裹
        // 使用Qs.stringify其实就是转成url的参数形式：a=1&b=2&c=3
        // 格式化模式有三种：indices、brackets、repeat
        data = Qs.stringify(data, { arrayFormat: 'repeat' });
      }
      finalConfig.data = data;
    }

    const handleCode = (res: AxiosResponse<ResType<any>>, data: ResType<any>) => {
      const code = data.code ?? 'default';
      const handlers = customConfig.requestCodeHandlers;
      const resCodeHandler =
        (handlers && (handlers[code] || handlers.default)) ||
        factoryCodeHandlers[code] ||
        factoryCodeHandlers.default;
      return resCodeHandler.handler(res, data, customConfig as CustomConfig);
    };

    try {
      const res: AxiosResponse<ResType<any>> = await ins(finalConfig);
      const data = res.data;
      return handleCode(res, data);
    } catch (error: any) {
      const res: AxiosResponse<ResType<any>> = error.response;
      const data = res.data;
      if (data && data.msg) {
        return handleCode(res, data);
      }
      // throw new Error(error);
    }
  }

  return request;
}
