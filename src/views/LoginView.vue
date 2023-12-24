<template>
  <a-row class="container" justify="center" align="center">
     <a-col :xs="20" :sm="16" :md="12" :lg="10" :xl="8">
         <a-form align="center" :model="formState" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
            <a-form-item label="邮箱" name="email" :rules="[{ required: true, message: '请输入邮箱!' }]">
              <a-input v-model:value="formState.username" size="large"/>
            </a-form-item>

            <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码!' }]">
              <a-input-password v-model:value="formState.password" size="large" />
            </a-form-item>

            <a-form-item align="center">
              <a-button type="primary" html-type="submit" size="large">登录</a-button>
            </a-form-item>
         </a-form>
     </a-col>
  </a-row>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';

interface FormState {
  username: string;
  password: string;
}

const formState = reactive<FormState>({
  username: '',
  password: '',
});

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>
<style>
.container {
  min-height: 400px;
}
</style>