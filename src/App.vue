<script setup lang="ts">

</script>

<template>
  <div>
    <header>
      <div><h1 class="logo">网盟系统</h1></div>
    </header>
    <div class="container">
      <RouterView />
    </div>
    <footer class="d-flex justify-content-center">
      <span>@copyright HoranHe</span>
    </footer>
  </div>
</template>

<style scoped>
.logo {
  color: #ffffff;
}
</style>
