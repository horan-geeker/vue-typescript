<script lang="ts" setup>
import { ref } from 'vue'
import { api } from '../../service/http'
import SendSMSButton from './SendSMSButton.vue'

interface FormState {
    phone: string
    sms: string
    password: string
}
const formRef = ref()
const formState = ref<FormState>({
    phone: "",
    sms: "",
    password: ""
})

const onFinish = (values: FormState) => {
    return api.auth.resetPassword({
        phone: +values.phone,
        sms: +values.sms,
        password: values.password,
    });
}

const onFinishFailed = (err: any) => {
    console.log('onFinishFail', err)
}

</script>

<template>
    <a-config-provider component-size="large">
        <a-form ref="formRef" :model="formState" name="registerForm" @finish="onFinish" @finishFailed="onFinishFailed"
            autocomplete="off" :label-col="{ span: 6 }">
            <a-form-item has-feedback label="手机号" name="phone" :rules="[{ required: true, message: '请输入手机号' }]">
                <a-input v-model:value="formState.phone"></a-input>
            </a-form-item>
            <a-form-item has-feedback label="短信验证码" name="sms" :rules="[{ required: true, message: '请输入短信验证码' }]">
                <a-flex gap="small">
                    <a-input v-model:value="formState.sms"></a-input>
                    <SendSMSButton />
                </a-flex>
            </a-form-item>
            <a-form-item has-feedback label="新密码" name="password" :rules="[{ required: true, message: '请输入新密码' }]">
                <a-input v-model:value="formState.password"></a-input>
            </a-form-item>
            <a-form-item>
                <a-flex justify="flex-end">
                    <a-button type="primary" html-type="submit">提交</a-button>
                </a-flex>
            </a-form-item>
        </a-form>
    </a-config-provider>
</template>
