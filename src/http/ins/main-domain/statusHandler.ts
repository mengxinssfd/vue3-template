import { HttpStatus } from '../../HttpStatus';
import type { CodeHandler, StatusHandlers } from '../../types';
import Token from '@/common/ts/Token';

// 通用错误Handler
const errorHandler: CodeHandler = (res, data, customConfig) => {
  if (!customConfig.silent) {
    // todo: 提示
    // ElMessage({ type: 'error', message: data.msg })
    console.log('非静音模式，显示错误信息');
  }
  // throw data.data || new Error( `data: ${JSON.stringify(data)}`);
  return Promise.reject(customConfig.returnRes ? res : data);
};

// enum StatusCode的方式有问题  直接写好了
export const statusHandler: StatusHandlers = {
  [HttpStatus.UNAUTHORIZED]: {
    msg: 'user unauthorized',
    handler: (res, data, customConfig) => {
      if (res.status === HttpStatus.UNAUTHORIZED) {
        // todo 保存至store
        // Store.commit('clearUser');
        console.log('清理掉保存的用户信息');
        Token.clear();
      }
      return errorHandler(res, data, customConfig);
    },
  },
  [HttpStatus.RESET_TOKEN]: {
    msg: 'reset token',
    handler: (res, data, customConfig) => {
      data.data.token && Token.set(data.data.token);
      return customConfig.returnRes ? res : data;
    },
  },
  [HttpStatus.OK]: {
    msg: 'response success',
    handler: (res, data, customConfig) => {
      return customConfig.returnRes ? res : data;
    },
  },
  default: {
    msg: 'response failed',
    handler: errorHandler,
  },
};
