// CodeHandler
import type { AxiosResponse } from 'axios';
import type { ResType } from '@/http/ResType';

export type CodeHandler = (
  res: AxiosResponse<ResType<any>>,
  data: ResType<any>,
  requestConfig: CustomConfig,
) => any;
// CodeHandlerItem
export interface CodeHandlerItem {
  msg: string;
  handler: CodeHandler;
}
// StatusHandlers
export type StatusHandlers = Record<number, CodeHandlerItem> & { default?: CodeHandlerItem };
// CustomConfig
export interface CustomConfig<T extends boolean = false> {
  returnRes?: T; // 返回res
  silent?: boolean; // 报错不弹窗
  //
  requestCodeHandlers?: StatusHandlers;
}

export declare interface ResType<T = never> {
  code: number;
  msg: string;
  data: T;
}
