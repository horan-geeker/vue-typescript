<script lang="ts" setup>
import { ref } from 'vue'
import PhonePasswordLogin from '../components/form/PhonePasswordLogin.vue'
import PhoneSMSLogin from '../components/form/PhoneSMSLogin.vue'

const activeComponent = ref('PhonePasswordLogin')

</script>

<template>
    <div class="d-flex justify-content-center">
        <div class="col-lg-4">
            <ul class="nav nav-tabs nav-fill m-md-2">
                <li class="nav-item">
                    <a class="nav-link" :class="{ active: activeComponent === 'PhonePasswordLogin' }"
                        @click="activeComponent = 'PhonePasswordLogin'">密码登录</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" :class="{ active: activeComponent === 'PhoneSMSLogin' }"
                        @click="activeComponent = 'PhoneSMSLogin'">短信验证码登录</a>
                </li>
            </ul>
            <KeepAlive>
                <PhonePasswordLogin v-if="activeComponent === 'PhonePasswordLogin'" />
                <PhoneSMSLogin v-else />
            </KeepAlive>
        </div>
    </div>
</template>