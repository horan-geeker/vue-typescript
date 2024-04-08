<script setup lang="ts">
import { HeartFilled } from '@ant-design/icons-vue'
</script>

<template>
  <a-layout style="min-height: 100vh;">
    <a-layout-header class="logo">{{ $translate('app.name') }}</a-layout-header>
    <a-layout-content class="container">
      <RouterView />
    </a-layout-content>
    <a-divider></a-divider>
    <a-layout-footer class="d-flex justify-content-center">
      <span class="d-flex align-items-center">Made with
        <HeartFilled class="mx-1" style="color: red" /> by Horan
      </span>
    </a-layout-footer>
  </a-layout>
</template>

<style scoped>
.logo {
  color: #ffffff;
}
</style>
