import { reactive, toRefs, isReactive, watch, isRef } from 'vue';
// import User from '@/api/User';

type FN = (...args: any[]) => Promise<any>;

interface State<T extends FN> {
  loading: boolean;
  data: Awaited<ReturnType<T>>['data'] | null;
  error: any | null;
}

type Options<A extends string, D extends object | void = void> = D extends void
  ? { requestAlias?: A; immediate?: boolean }
  : {
      immediate?: boolean;
      data?: D;
      dataDriver?: boolean;
    };

/**
 * 请求hooks
 *
 * @example
 *
 * // 手动请求 request不带参数
 * const res = useRequest(User.getSelf, { requestAlias: 'getSelf', immediate: true });
 * res.getSelf();
 * console.log(res.data.value?.user);
 *
 * const formModel = reactive({ username: '', password: '' });
 *
 * // 手动请求 request带参数
 * const res2 = useRequest(User.login);
 * res2.request(formModel);
 * console.log(res2.data.value?.token);
 *
 * formModel.username = '1';
 * formModel.password = '1';
 *
 * // 数据驱动
 * const res3 = useRequest(User.login, {
 *   data: formModel,
 *   immediate: true,
 *   dataDriver: true,
 * });
 * // res3.request(formModel); // error Property 'request' does not exist
 * // 修改formModel自动触发请求
 * formModel.username = '2';
 * formModel.password = '2';
 * console.log(res3.data.value?.token);
 *
 * @param  requestFn
 * @param  options
 * @param  defaultData
 */
export function useRequest<
  REQ extends FN,
  ALIAS extends string = 'request',
  DATA extends object | void = void,
>(
  requestFn: REQ,
  options: Options<ALIAS, DATA> = {} as any,
  defaultData: Awaited<ReturnType<REQ>>['data'] | null = null,
) {
  const state = reactive<State<REQ>>({
    loading: false,
    data: defaultData,
    error: null,
  });

  const refs = toRefs(state);

  const request = (...args: any[]) => {
    // computed变量不能JSON.stringfy
    args = args.map((item) => (isRef(item) ? item.value : item));
    state.loading = true;
    requestFn(...args)
      .then(
        (res) => {
          state.data = res.data;
        },
        (err) => (state.error = err),
      )
      .finally(() => {
        state.loading = false;
      });
  };

  const {
    requestAlias = 'request',
    immediate = false,
    data,
    dataDriver = false,
  } = options as Options<ALIAS, {}> & Options<ALIAS>;

  // 数据驱动
  if (dataDriver && data && (isReactive(data) || isRef(data))) {
    watch(
      data,
      (n) => {
        request(n);
      },
      { deep: true },
    );
  }

  if (immediate) {
    request(data);
  }

  return {
    ...refs,
    // 数据驱动时as any一下还是能用的
    [requestAlias]: request,
  } as typeof refs &
    (DATA extends void
      ? { [k in keyof Record<ALIAS, void>]: (...args: Parameters<REQ>) => void }
      : void);
}

// // 手动请求 request不带参数
// const res = useRequest(User.getSelf, { requestAlias: 'getSelf', immediate: true });
// res.getSelf();
// console.log(res.data.value?.user);
//
// const formModel = reactive({ username: '', password: '' });
//
// // 手动请求 request带参数
// const res2 = useRequest(User.login);
// res2.request(formModel);
// console.log(res2.data.value?.token);
//
// formModel.username = '1';
// formModel.password = '1';
//
// // 数据驱动
// const res3 = useRequest(User.login, {
//   data: formModel,
//   immediate: true,
//   dataDriver: true,
// });
// // res3.request(formModel); // error Property 'request' does not exist
// console.log(res3.data.value?.token);
