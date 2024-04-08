<script lang="ts" setup>
import { ref } from 'vue'

interface FormState {
    email: string
    password: string
}
const formState = ref<FormState>({
    email: "",
    password: ""
})

const onFinish = (values: FormState) => {
    console.log(values)
}

const onFinishFail  = (err: any) => {
    console.log(err)
}
</script>

<template>
    <a-form :model="formState" @onFinish="onFinish" @onFinishFail="onFinishFail">
        <a-form-item label="邮箱" name="email" :rules="[{required: true, message: '请输入邮箱'}]">
            <a-input v-model:value="formState.email"></a-input>
        </a-form-item>
        <a-form-item label="密码" name="password" :rules="[{required: true, message: '请输入密码'}]">
            <a-input-password v-model:value="formState.password"></a-input-password>
        </a-form-item>
        <a-form-item style="text-align: right;">
            <a-button type="primary">注册</a-button>
        </a-form-item>
    </a-form>
</template>
