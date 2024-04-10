<script lang="ts" setup>
import { ref } from 'vue'
import PhonePasswordLogin from '../components/form/PhonePasswordLogin.vue'
import PhoneSMSLogin from '../components/form/PhoneSMSLogin.vue'

let activeComponent = ref('PhonePasswordLogin')

function switchView(componentName: string) {
    console.log(componentName)
    activeComponent.value = componentName
}

</script>

<template>
    <div class="d-flex justify-content-center">
        <div class="col-lg-4">
            <div class="m-4 pt-5">
                <h3 class="text-center fs-4 fw-light">{{ $translate('app.name') }}</h3>
                <div class="border-bottom"></div>
            </div>
            <KeepAlive>
                <PhonePasswordLogin @switch-view="switchView" v-if="activeComponent === 'PhonePasswordLogin'" />
                <PhoneSMSLogin @switch-view="switchView" v-else />
            </KeepAlive>
        </div>
    </div>
</template>