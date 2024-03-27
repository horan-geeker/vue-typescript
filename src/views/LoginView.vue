<script lang="ts" setup>
import PhonePasswordLogin from '../components/form/PhonePasswordLogin.vue'
import PhoneSMSLogin from '../components/form/PhoneSMSLogin.vue'

const activeComponent = 'PhonePasswordLogin'

function clickTab() {
    activeComponent == 'PhonePasswordLogin' ? activeComponent = 'PhoneSMSLogin' : activeComponent = 'PhonePasswordLogin'
    console.log(activeComponent)
}

</script>

<template>
    <div class="container">
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a class="nav-link" :class="{active : activeComponent == PhonePasswordLogin}" @click="clickTab()">密码登录</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" :class="{active: activeComponent == PhoneSMSLogin}" @click="clickTab">短信验证码登录</a>
            </li>
        </ul>
        <KeepAlive>
            <component :is="activeComponent"></component>
        </KeepAlive>
    </div>
</template>