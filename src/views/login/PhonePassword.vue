<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { object, string, number } from 'yup'
import { toTypedSchema } from '@vee-validate/yup'

const schema = toTypedSchema(object({
    phone: number().integer().required(),
    password: string().min(8).required(),
}))

interface Form {
    phone: number;
    password: string;
}

const {errors, defineField, handleSubmit, isSubmitting} = useForm<Form>({
    validationSchema: schema,
})

const [phone, phoneAttrs] = defineField('phone')
const [password, passwordAttrs] = defineField('password')

const phoneField = useField<number>('phone')
const passwordField = useField<string>('password')

function onSuccess(values: Form) {
    console.log("success", values.phone)
    return new Promise<void>(resolve => {
        setTimeout(() => {
            console.log('Submitted', JSON.stringify(values, null, 2));
            resolve();
        }, 2000);
  });
}

const onSubmit = handleSubmit(onSuccess)

</script>

<template>
    <form autocomplete="on" @submit.prevent="onSubmit" novalidate>
        <div class="row mb-3">
            <label for="phone" class="col-sm-2 col-form-label">手机号</label>
            <div class="col-sm-10">
                <input name="phone" class="form-control" v-model="phone" v-bind="phoneAttrs" id="phone" @blur="phoneField.handleBlur"/>
                <div v-if="!phoneField.meta.valid && phoneField.meta.touched" class="invalid-feedback">{{ phoneField.errorMessage }}</div>
            </div>
        </div>
        <div class="row mb-3">
            <label for="password" class="col-sm-2 col-form-label">密码</label>
            <div class="col-sm-8">
                <input name="password" class="form-control" 
                :class="{ 'is-valid': passwordField.meta.valid, 'is-invalid': passwordField.meta.touched && !passwordField.meta.valid }"
                v-model="password"
                v-bind="passwordAttrs"
                type="password"
                id="password" 
                @blur="passwordField.handleBlur"
                aria-describedby="validationPasswordFeedback"
                />
            </div>
            <div class="col-sm-2 invalid-feedback" id="validationPasswordFeedback" v-if="!passwordField.meta.valid && passwordField.meta.touched">{{ passwordField.errorMessage }}</div>
        </div>
        <button :disabled="isSubmitting" type="submit">{{ isSubmitting ? "请求中..." : "登录" }}</button>
    </form>
</template>