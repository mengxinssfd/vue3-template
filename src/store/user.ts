import { defineStore } from 'pinia';
import User from '@/api/User';
import Token from '@/common/ts/Token';

const useUserStore = defineStore({
  id: 'user',
  state: () => {
    return new User();
  },
  actions: {
    async login(username: string, password: string) {
      const res = await User.login({ username, password });
      Token.set(res.data.token);
      this.getMe();
    },
    async getMe() {
      const {
        data: { user },
      } = await User.getSelf();
      this.$state = user;
    },
  },
});

export default useUserStore;
