<script setup lang="ts">
import { ref } from 'vue'
import { Field } from 'vee-validate'

</script>

<template>
    <form autocomplete="on">
        <Field name="phone" id="phone" rules="required|digits:11"/>
        <Field name="password" type="password" id="password" rules="required" />
        <Field name="confirmation" type="password" id="confirmation" rules="required|conformed:password" />
    </form>
</template>