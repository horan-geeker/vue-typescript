<script setup lang="ts">
import { useField, useForm, type SubmissionContext,  type InvalidSubmissionContext } from 'vee-validate'
import { object, string, number } from 'yup'
import { toTypedSchema } from '@vee-validate/yup'

// const schema = toTypedSchema(object({
//     phone: number().integer().required(),
//     password: string().min(8).required(),
// }))

interface Form {
    phone: number;
    password: string;
}

const {defineField, handleSubmit, isSubmitting} = useForm<Form>({
    // validationSchema: schema,
})

const [phone, phoneAttrs] = defineField('phone')
const [password, passwordAttrs] = defineField('password')

const phoneField = useField<number>('phone', number().required())
const passwordField = useField<string>('password', string().required().min(8))

function submitHandler(values: Form, ctx: SubmissionContext) {
    console.log("success", values, ctx)
    return new Promise<void>(resolve => {
        setTimeout(() => {
            console.log('Submitted', JSON.stringify(values, null, 2));
            resolve();
        }, 2000);
    });
}

function invalidSubmitHandler(ctx: InvalidSubmissionContext<Form>) {
    console.log(ctx)
}

const onSubmit = handleSubmit(submitHandler, invalidSubmitHandler)

</script>

<template>
    <div class="row justify-content-center">
        <form class="col-lg-4" autocomplete="on" @submit.prevent="onSubmit" novalidate>
            <div class="row mb-3">
                <label for="phone" class="col-sm-4 col-form-label text-md-end">手机号</label>
                <div class="col-sm-8">
                    <input name="phone" 
                    class="form-control"
                    :class="{ 'is-valid': phoneField.meta.touched && phoneField.meta.valid, 'is-invalid': phoneField.meta.touched && !phoneField.meta.valid }"
                    id="phone"
                    v-model="phone"
                    v-bind="phoneAttrs"
                    @blur="phoneField.handleBlur"/>
                    <div v-if="!phoneField.meta.valid && phoneField.meta.touched" class="invalid-feedback">{{ phoneField.errorMessage }}</div>
                </div>
            </div>
            <div class="row mb-3">
                <label for="password" class="col-sm-4 col-form-label text-md-end">密码</label>
                <div class="col-sm-8">
                    <input name="password"
                    class="form-control" :class="{ 'is-valid': passwordField.meta.touched && passwordField.meta.valid, 'is-invalid': passwordField.meta.touched && !passwordField.meta.valid }"
                    v-model="password"
                    v-bind="passwordAttrs"
                    type="password"
                    id="password" 
                    @blur="passwordField.handleBlur"
                    />
                    <div class="invalid-feedback" v-if="!passwordField.meta.valid && passwordField.meta.touched">{{ passwordField.errorMessage }}</div>
                </div>
            </div>
            <div class="d-flex justify-content-end">
                <button class="btn btn-primary" :disabled="isSubmitting" type="submit">{{ isSubmitting ? "请求中..." : "登录" }}</button>
            </div>
        </form>
    </div>
</template>