<script setup lang="ts">
import { ref } from 'vue'
const phone = ref<number>()
const code = ref<number>()

function check(event: Event) {
    console.log(event)
}
</script>

<template>
    <form @submit.prevent="check" autocomplete="on">
        <label for="phone">手机号</label>
        <input type="text" v-model="phone" id="phone">
        <label for="code">短信验证码</label>
        <input type="text" v-model="code" id="code">
        <button type="submit">登录</button>
    </form>
</template>