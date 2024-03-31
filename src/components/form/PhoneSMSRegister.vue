<script setup lang="ts">
import { useField, useForm, type SubmissionContext, type InvalidSubmissionContext } from 'vee-validate'

interface Form {
    phone: number;
    sms: number;
    password: number;
    passwordConfirm: number;
}
const { defineField, handleSubmit, isSubmitting } = useForm<Form>()
const [phone, phoneAttrs] = defineField('phone')
const [sms, smsAttrs] = defineField('sms')
const [password, passwordAttrs] = defineField('password')
const [passwordConfirm, passwordConfirmAttrs] = defineField('passwordConfirm')

const phoneField = useField<number>('phone', 'required|digits:11', { label: "手机号" })
const smsField = useField<string>('sms', 'required|digits:4', { label: "短信验证码" })
const passwordField = useField<string>('password', 'required|min:8', { label: "密码" })
const passwordConfirmField = useField<string>('passwordConfirm', 'required|confirmed:@password', { label: "确认密码" })

function submitHandler(values: Form, ctx: SubmissionContext) {
    console.log("submitHandler", values, ctx)
    return new Promise<void>(resolve => {
        setTimeout(() => {
            console.log('Submitted', JSON.stringify(values, null, 2));
            resolve();
        }, 2000);
    });
}

function invalidSubmitHandler(ctx: InvalidSubmissionContext<Form>) {
    console.log("invalidSubmitHandler", ctx, phoneField)
}

const onSubmit = handleSubmit(submitHandler, invalidSubmitHandler)

</script>

<template>
    <div>
        <form autocomplete="on" @submit.prevent="onSubmit" novalidate>
            <div class="row mb-3">
                <label for="phone" class="col-sm-4 col-form-label text-md-end">手机号</label>
                <div class="col-sm-8">
                    <input name="phone" class="form-control"
                        :class="{ 'is-valid': phoneField.meta.touched && phoneField.meta.valid, 'is-invalid': phoneField.meta.touched && !phoneField.meta.valid }"
                        id="phone" v-model="phone" v-bind="phoneAttrs" @blur="phoneField.handleBlur" />
                    <div v-if="!phoneField.meta.valid && phoneField.meta.touched" class="invalid-feedback"><span>{{
                            phoneField.errorMessage.value }}</span></div>
                </div>
            </div>
            <div class="row mb-3">
                <label for="sms" class="col-sm-4 col-form-label text-md-end">短信验证码</label>
                <div class="col-sm-8">
                    <input name="sms" class="form-control"
                        :class="{ 'is-valid': smsField.meta.touched && smsField.meta.valid, 'is-invalid': smsField.meta.touched && !smsField.meta.valid }"
                        v-model="sms" v-bind="smsAttrs" type="text" id="sms" @blur="smsField.handleBlur" />
                    <div class="invalid-feedback" v-if="!smsField.meta.valid && smsField.meta.touched">{{
                        smsField.errorMessage.value }}</div>
                </div>
            </div>
            <div class="row mb-3">
                <label for="password" class="col-sm-4 col-form-label text-md-end">密码</label>
                <div class="col-sm-8">
                    <input name="password" class="form-control"
                        :class="{ 'is-valid': passwordField.meta.touched && passwordField.meta.valid, 'is-invalid': passwordField.meta.touched && !passwordField.meta.valid }"
                        v-model="password" v-bind="passwordAttrs" type="password" id="password"
                        @blur="passwordField.handleBlur" /><i class="fa fa-lock"></i>
                    <div class="invalid-feedback" v-if="!passwordField.meta.valid && passwordField.meta.touched">
                        <span>{{ passwordField.errorMessage.value }}</span>
                    </div>
                </div>
            </div>
            <div class="row mb-3">
                <label for="passwordConfirm" class="col-sm-4 col-form-label text-md-end">确认密码</label>
                <div class="col-sm-8">
                    <input name="passwordConfirm" class="form-control"
                        :class="{ 'is-valid': passwordConfirmField.meta.touched && passwordConfirmField.meta.valid, 'is-invalid': passwordConfirmField.meta.touched && !passwordConfirmField.meta.valid }"
                        v-model="passwordConfirm" v-bind="passwordConfirmAttrs" type="password" id="passwordConfirm"
                        @blur="passwordConfirmField.handleBlur" />
                    <div class="invalid-feedback"
                        v-if="!passwordConfirmField.meta.valid && passwordConfirmField.meta.touched">
                        <span>{{ passwordConfirmField.errorMessage.value }}</span>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-end">
                <button class="btn btn-primary" :disabled="isSubmitting" type="submit">{{ isSubmitting ? "请求中..." : "注册"
                    }}</button>
            </div>
        </form>
    </div>
</template>