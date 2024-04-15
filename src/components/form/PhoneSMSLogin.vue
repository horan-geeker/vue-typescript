<script setup lang="ts">
import { useField, useForm, type SubmissionContext,  type InvalidSubmissionContext } from 'vee-validate'
import { api } from '@/service/http'
import SendSMSButton from './SendSMSButton.vue';

interface Form {
    phone: number;
    sms: number;
}
const { defineField, handleSubmit, isSubmitting, setFieldError } = useForm<Form>()
const [phone, phoneAttrs] = defineField('phone')
const [sms, smsAttrs] = defineField('sms')

const phoneField = useField<number>('phone', 'required|digits:11', {label: "手机号"})
const smsField = useField<string>('sms', 'required|digits:4', {label: "短信验证码"})

function submitHandler(values: Form, ctx: SubmissionContext) {
    return api.auth.login({
        phone: values.phone,
        sms: values.sms
    });
}

function invalidSubmitHandler(ctx: InvalidSubmissionContext<Form>) {
    console.log("invalidSubmitHandler", ctx, phoneField)
}

const onSubmit = handleSubmit(submitHandler, invalidSubmitHandler)

function validatePhoneBeforeSendSMS(valid: boolean, message: string) {
    if (!valid) {
        phoneField.setTouched(true)
        phoneField.setErrors(message)
    }
}

</script>

<template>
    <div class="container p-4">
        <form autocomplete="on" @submit.prevent="onSubmit" novalidate>
            <div class="row mb-3">
                <label for="phone" class="col-sm-3 col-form-label text-md-end">手机号</label>
                <div class="col-sm-9">
                    <input name="phone" class="form-control"
                        :class="{ 'is-valid': phoneField.meta.touched && phoneField.meta.valid, 'is-invalid': phoneField.meta.touched && !phoneField.meta.valid }"
                        id="phone" v-model="phone" v-bind="phoneAttrs" @blur="phoneField.handleBlur" />
                    <div v-if="!phoneField.meta.valid && phoneField.meta.touched" class="invalid-feedback"><span>{{
                            phoneField.errorMessage.value }}</span></div>
                </div>
            </div>
            <div class="row mb-3">
                <label for="phone" class="col-sm-3 col-form-label text-md-end">短信验证码</label>
                <div class="col-sm-9">
                    <div class="input-group">
                        <input name="sms" class="form-control"
                            :class="{ 'is-valid': smsField.meta.touched && smsField.meta.valid, 'is-invalid': smsField.meta.touched && !smsField.meta.valid }"
                            v-model="sms" v-bind="smsAttrs" type="text" id="sms" @blur="smsField.handleBlur" />
                        <SendSMSButton style="height: auto;" @validate-phone="validatePhoneBeforeSendSMS" :phone="phoneField.value.value"/>
                    </div>
                    <div class="invalid-feedback" v-if="!smsField.meta.valid && smsField.meta.touched">{{
                        smsField.errorMessage.value }}</div>
                </div>
            </div>
            <div class="d-flex justify-content-end">
                <div class="col-md-9 col-12 d-flex justify-content-end"><a class="text-secondary mb-4"
                        @click="$emit('switchView', 'PhonePasswordLogin')">密码登录</a></div>
            </div>
            <div class="d-flex justify-content-end">
                <div class="col-md-9 col-12 d-flex justify-content-between">
                    <RouterLink to="/register" class="btn btn-success">注册</RouterLink>
                    <button class="btn btn-primary" :disabled="isSubmitting" type="submit">{{ isSubmitting ? "请求中..." :
                        "登录"
                        }}</button>
                </div>
            </div>
        </form>
    </div>
</template>