<script lang="ts" setup>
import PhoneSMSRegister from '@/components/form/PhoneSMSRegister.vue'
import EmailPasswordRegister from '@/components/form/EmailPasswordRegister.vue';
</script>

<template>
    <div class="d-flex justify-content-center">
        <div class="col-lg-4">
            <div class="m-4 pt-5">
                <h3 class="text-center fs-4 fw-light">{{ $translate('app.name') }}</h3>
                <div class="border-bottom"></div>
            </div>
            <div class="container p-4">
                <EmailPasswordRegister />
            </div>
        </div>
    </div>
</template>