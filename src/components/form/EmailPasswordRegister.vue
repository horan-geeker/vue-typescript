<script lang="ts" setup>
import { ref } from 'vue'
import type { Rule } from 'ant-design-vue/es/form';
import type { FormInstance } from 'ant-design-vue';

interface FormState {
    email: string
    password: string
    confirmPassword: string
}
const formRef = ref<FormInstance>()
const formState = ref<FormState>({
    email: "",
    password: "",
    confirmPassword: ""
})

const onFinish = (values: FormState) => {
    console.log('onFinish', values)
}

const onFinishFail  = (err: any) => {
    console.log('onFinishFail', err)
}

const checkConfirm = async (rule: Rule, value: string) => {
    formRef.value.validateFields('confirmPassword')
}

const confirmValidate = async (rule: Rule, value: string) => {
    if (value === '') {
        return Promise.reject('请输入确认密码')
    } else {
        if (value !== formState.value.password) {
            console.log('validate', rule, value)
            return Promise.reject("确认密码和密码不匹配!");
        }
        return Promise.resolve();
    }
}

</script>

<template>
    <a-form ref="formRef" :model="formState" @onFinish="onFinish" @onFinishFail="onFinishFail">
        <a-form-item has-feedback label="邮箱" name="email" :rules="[{required: true, message: '请输入邮箱'}]">
            <a-input v-model:value="formState.email"></a-input>
        </a-form-item>
        <a-form-item has-feedback label="密码" name="password"
            :rules="[{required: true, message: '请输入密码'}, {min: 6, message: '至少需要输入6个字符'}, {validator: checkConfirm, trigger: 'change'}]">
            <a-input-password v-model:value="formState.password"></a-input-password>
        </a-form-item>
        <a-form-item has-feedback label="确认密码" name="confirmPassword"
            :rules="[{ required: true, message: '请输入密码' }, { validator: confirmValidate, trigger: 'change' }]">
            <a-input-password v-model:value="formState.confirmPassword"></a-input-password>
        </a-form-item>
        <a-form-item style="text-align: right;">
            <a-button type="primary" html-type="submit">注册</a-button>
        </a-form-item>
    </a-form>
</template>
