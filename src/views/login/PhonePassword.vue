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

const {meta, handleBlur} = useField<number>('phone')

function onSuccess(values: Form) {
    console.log("success", values.phone)
    return new Promise<void>(resolve => {
        setTimeout(() => {
            console.log('Submitted', JSON.stringify(values, null, 2));
            resolve();
        }, 2000);
  });
}

function onInvalidSubmit({ values, errors, results }) {
    console.log("onInvalidSubmit", { values, errors, results })
}

const onSubmit = handleSubmit(onSuccess, onInvalidSubmit)

</script>

<template>
    <form autocomplete="on" @submit.prevent="onSubmit" :validation-schema="schema">
        <label for="phone">手机号</label>
        <input name="phone" v-model="phone" v-bind="phoneAttrs" id="phone" @blur="handleBlur"/>
        <span v-if="!meta.valid && meta.touched">{{ errors.phone }}</span>
        <label for="password">密码</label>
        <input name="password" v-model="password" v-bind="passwordAttrs" type="password" id="password" />
        <button :disabled="isSubmitting" type="submit">{{ isSubmitting ? "请求中..." : "登录" }}</button>
    </form>
    <pre>errors: {{ errors }}</pre>
    <pre>meta: {{ meta }}</pre>
</template>