<script setup lang="ts">
import { useField, useForm, type SubmissionContext,  type InvalidSubmissionContext } from 'vee-validate'
import { api } from '@/service/http'

interface Form {
    phone: number;
    password: string;
}
const {defineField, handleSubmit, isSubmitting} = useForm<Form>()
const [phone, phoneAttrs] = defineField('phone')
const [password, passwordAttrs] = defineField('password')

const phoneField = useField<number>('phone', 'required|digits:11', {label: "手机号"})
const passwordField = useField<string>('password', 'required|min:6', {label: "密码"})

function submitHandler(values: Form, ctx: SubmissionContext) {
    return api.auth.login({
        phone: values.phone,
        password: values.password
    }).then(response => {
        console.log(response.data.data.user)
    });
}

function invalidSubmitHandler(ctx: InvalidSubmissionContext<Form>) {
    console.log("invalidSubmitHandler", ctx, phoneField)
}

const onSubmit = handleSubmit(submitHandler, invalidSubmitHandler)

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
                    <div v-if="!phoneField.meta.valid && phoneField.meta.touched" class="invalid-feedback">{{ phoneField.errorMessage.value }}</div>
                </div>
            </div>
            <div class="row mb-3">
                <label for="password" class="col-sm-3 col-form-label text-md-end">密码</label>
                <div class="col-sm-9">
                    <input name="password" class="form-control"
                        :class="{ 'is-valid': passwordField.meta.touched && passwordField.meta.valid, 'is-invalid': passwordField.meta.touched && !passwordField.meta.valid }"
                        v-model="password" v-bind="passwordAttrs" type="password" id="password" @blur="passwordField.handleBlur" />
                    <div class="invalid-feedback" v-if="!passwordField.meta.valid && passwordField.meta.touched"><span>{{ passwordField.errorMessage.value }}</span></div>
                </div>
            </div>
            <div class="d-flex justify-content-end">
                <div class="col-md-9 col-12 d-flex justify-content-between"><p class="text-secondary">短信验证码登录</p><p class="text-secondary">忘记密码？</p></div>
            </div>
            <div class="d-flex justify-content-end">
                <button class="btn btn-primary" :disabled="isSubmitting" type="submit">{{ isSubmitting ? "请求中..." : "登录"
                    }}</button>
            </div>
        </form>
    </div>
</template>