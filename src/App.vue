<script setup lang="ts">
import useUserStore from '@/store/user';
const userStore = useUserStore();

userStore.getMe();
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss">
@import 'common/styles/base';
</style>
