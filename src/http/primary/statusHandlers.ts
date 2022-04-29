import { StatusHandler, StatusHandlers, HttpStatus, CustomConfig } from 'request-template';
import Token from '@/common/ts/Token';

// 通用错误Handler
const errorHandler: StatusHandler<CustomConfig> = ({ customConfig }, res, data) => {
  if (!customConfig.silent) {
    // todo: 提示
    // ElMessage({ type: 'error', message: data.msg })
    console.log('非静音模式，显示错误信息');
  }
  // throw data.data || new Error( `data: ${JSON.stringify(data)}`);
  return Promise.reject(customConfig.returnRes ? res : data);
};

// enum StatusCode的方式有问题  直接写好了
export const statusHandlers: StatusHandlers = {
  [HttpStatus.UNAUTHORIZED]: (ctx, res, data) => {
    if (res.status === HttpStatus.UNAUTHORIZED) {
      // todo 保存至store
      // Store.commit('clearUser');
      console.log('清理掉保存的用户信息');
      Token.clear();
    }
    return errorHandler(ctx, res, data);
  },
  207: ({ customConfig }, res, data) => {
    data.data.token && Token.set(data.data.token);
    return customConfig.returnRes ? res : data;
  },
  [HttpStatus.OK]: ({ customConfig }, res, data) => {
    return customConfig.returnRes ? res : data;
  },
  default: errorHandler,
};
