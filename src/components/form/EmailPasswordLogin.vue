<template>
  <div class="container" justify="center" align="center">
    <div :xs="20" :sm="16" :md="12" :lg="10" :xl="8">
      <form autocomplete="on" @submit.prevent="onSubmit" @finishFailed="onSubmitFailed">
        <label for="email">邮箱</label>
        <input v-model="formState.username" size="large" id="email" />

        <label for="password">密码</label>
        <input v-model="formState.password" size="large" id="password"/>

        <label align="center">
          <button type="submit" size="large">登录</button>
        </label>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

interface FormState {
  username: string;
  password: string;
}

const formState = ref<FormState>({
  username: '',
  password: '',
});

const onSubmit = (values: any) => {
  console.log('Success:', values);
};

const onSubmitFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>
<style>
.container {
  min-height: 400px;
}
</style>