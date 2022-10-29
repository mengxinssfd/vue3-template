<template>
  <img
    class="flex items-center justify-around rounded-xl animate__shakeX animate__animated animate__infinite"
    alt="Vue logo"
    src="../../assets/logo.png"
  />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" @change="onPageChange" />
</template>
<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue';
import { useRequest } from '@request-template/vue3-hooks';
import { useRoute, useRouter } from 'vue-router';
import { getArticleList } from '@/api/article';
import { computed, watch } from 'vue';

const route = useRoute();
const router = useRouter();
const onPageChange = (page: number) => {
  const query: any = { ...route.query };
  query.page = page;
  router.replace({ path: route.path, query });
};
const params = computed(() => {
  const q = route.query;
  return {
    keyword: q.query || '',
    sort: q.sort ? Number(q.sort) : 3,
    category: q.cate ? Number(q.cate) : '',
    tag: ((q.tag as string) || '').split(',').filter(Boolean).map(Number),
    page: q.page ? Number(q.page) : 1,
  };
});
const { data, loading } = useRequest(
  getArticleList,
  { data: params, immediate: true },
  { list: [], count: 0 },
);
watch(loading, () => {
  console.log(data.value.list, data.value.count);
});
</script>
