import axios, { AxiosRequestHeaders } from 'axios';
import { axiosFactory } from '../../factory';
import { statusHandler } from './statusHandler';
import Token from '@/common/ts/Token';

// let uuid = localStorage.getItem('uuid');
// function getUUID() {
//   if (uuid) {
//     return uuid;
//   }
//   uuid = createUUID(10);
//   localStorage.setItem('uuid', uuid);
//   return uuid;
// }

const commonAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});
commonAxiosInstance.interceptors.request.use((value) => {
  const headers = value.headers as AxiosRequestHeaders;
  Token.exists() && (headers.authorization = `Bearer ${Token.get()}`);
  // headers.uuid = getUUID();
  return value;
});
commonAxiosInstance.interceptors.response.use((value) => {
  return value;
});

// 编辑器显示这样await出来的返回值类型是any 不准确
// const [Get, Post, Patch, Delete] = (['get', 'post', 'patch', 'delete'] as Method[]).map((method) =>
//   axiosFactory(commonAxiosInstance, { method }, statusHandler),
// );
// export { Get, Post, Patch, Delete };

// 这样await出来的返回值类型正确
export const Get = axiosFactory(commonAxiosInstance, { method: 'get' }, statusHandler);
export const Post = axiosFactory(commonAxiosInstance, { method: 'post' }, statusHandler);
export const Patch = axiosFactory(commonAxiosInstance, { method: 'patch' }, statusHandler);
export const Delete = axiosFactory(commonAxiosInstance, { method: 'delete' }, statusHandler);
