import { reactive, toRefs } from 'vue';
// import User from '@/api/User';

type FN = (...args: any[]) => Promise<any>;

interface State<T extends FN> {
  loading: boolean;
  data: Awaited<ReturnType<T>>['data'] | null;
  error: any | null;
}

export function useRequest<T extends FN>(fn: T) {
  const state = reactive<State<T>>({
    loading: false,
    data: null,
    error: null,
  });

  return {
    ...toRefs(state),
    request(...args: Parameters<T>) {
      state.loading = true;
      fn(...args)
        .then(
          (res) => {
            state.data = res.data;
          },
          (err) => (state.error = err),
        )
        .finally(() => {
          state.loading = false;
        });
    },
  };
}

// const res = useRequest(User.getSelf);
// res.request();
// console.log(res.data.value?.user);
//
// const res2 = useRequest(User.login);
// res2.request({ username: '', password: '' });
// console.log(res2.data.value?.token);
