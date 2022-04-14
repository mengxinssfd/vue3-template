import { defineStore } from 'pinia';

export const useTestStore = defineStore({
  id: 'test',
  state: () => {
    return { firstName: 'foo', lastName: 'bar', count: 0 };
  },
  getters: {
    fullName(state) {
      return `${state.firstName} ${state.lastName}`;
    },
  },
  actions: {
    setName(firstName: string, lastName: string) {
      this.firstName = firstName;
      this.lastName = lastName;
    },
  },
});
