<script lang="ts" setup>
import { ref } from 'vue'
import type { Rule } from 'ant-design-vue/es/form'
import { api } from '@/service/http'

interface FormState {
    email: string
    password: string
    confirmPassword: string
}
const formRef = ref()
const formState = ref<FormState>({
    email: "",
    password: "",
    confirmPassword: ""
})

const onFinish = (values: FormState) => {
    return api.auth.register({
        name: values.email,
        email: values.email,
        password: values.password,
    });
}

const onFinishFailed  = (err: any) => {
    console.log('onFinishFail', err)
}

const checkConfirm = async (rule: Rule, value: string) => {
    formRef.value.validateFields('confirmPassword')
}

const confirmValidate = async (rule: Rule, value: string) => {
    if (value !== formState.value.password) {
        console.log('validate', rule, value)
        return Promise.reject("确认密码和密码不匹配!")
    }
    return Promise.resolve
}

</script>

<template>
    <a-config-provider component-size="large">
        <a-form ref="formRef" :model="formState" name="registerForm" @finish="onFinish" @finishFailed="onFinishFailed" autocomplete="off"
            :label-col="{ span: 5 }">
            <a-form-item has-feedback label="邮箱" name="email" :rules="[{ required: true, message: '请输入邮箱' }]">
                <a-input v-model:value="formState.email"></a-input>
            </a-form-item>
            <a-form-item has-feedback label="密码" name="password"
                :rules="[{ required: true, message: '请输入密码' }, { min: 6, message: '至少需要输入6个字符' }, { validator: checkConfirm, trigger: 'change' }]">
                <a-input-password v-model:value="formState.password"></a-input-password>
            </a-form-item>
            <a-form-item has-feedback label="确认密码" name="confirmPassword" :validateFirst="true"
                :rules="[{ required: true, message: '请输入确认密码' }, { min: 6, message: '至少需要输入6个字符' }, { validator: confirmValidate, trigger: 'change' }]">
                <a-input-password v-model:value="formState.confirmPassword"></a-input-password>
            </a-form-item>
            <a-form-item>
                <a-row>
                    <a-col offset="5" span="19">
                        <a-row justify="space-between">
                            <RouterLink to="/login"><a-button type="default">登录</a-button></RouterLink>
                            <a-button type="primary" html-type="submit">注册</a-button>
                        </a-row>
                    </a-col>
                </a-row>
            </a-form-item>
        </a-form>
    </a-config-provider>
</template>
