<script setup lang="ts">
import { HeartFilled } from '@ant-design/icons-vue'
</script>

<template>
  <div>
    <a-layout>
      <a-layout-header class="logo">后台管理系统</a-layout-header>
      <a-layout-content style="background-color: beige;">
        <RouterView />
      </a-layout-content>
      <a-layout-footer class="d-flex justify-content-center">
        <span>@copyright<HeartFilled style="color: red" />HoranHe</span>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
.logo {
  color: #ffffff;
}
</style>
