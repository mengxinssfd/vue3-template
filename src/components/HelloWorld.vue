<script setup lang="ts">
import { ref } from 'vue';
import { useTestStore } from '@/store/test';

defineProps<{ msg: string }>();
defineEmits(['change']);
const store = useTestStore();

setTimeout(() => {
  store.setName('hello', 'pinia');
  // emits('change', 2);
}, 2000);

const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank"> Vite Docs </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
  <p>
    {{ store.firstName }} <br />
    {{ store.lastName }} <br />
    {{ store.fullName }} <br />
  </p>
  <button @click="store.count++">{{ store.count }}</button>
</template>

<style scoped lang="scss">
// .hello-world .antd-1会被tree shaking掉
.hello-world {
  font-size: 200px;
}
.antd-1 {
  color: red;
}
a {
  color: #42b983;
}
label {
  margin: 0 0.5em;
  font-weight: bold;
}
code {
  display: inline-flex;
  align-items: center;
  padding: 2px 4px;
  border-radius: 4px;
  color: $theme-color;
  background-color: #eeeeee;
  user-select: auto;
}
</style>
