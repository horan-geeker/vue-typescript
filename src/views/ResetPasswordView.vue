<script lang="ts" setup>
import ResetPassword from '../components/form/ResetPassword.vue'
</script>

<template>
    <div class="d-flex justify-content-center">
        <div>
            <div class="m-4 pt-5">
                <h3 class="text-center fs-4 fw-light">{{ $translate('app.name') }}</h3>
                <div class="border-bottom"></div>
            </div>
            <div class="container p-4">
                <ResetPassword />
            </div>
        </div>
    </div>
</template>