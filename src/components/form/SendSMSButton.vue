<script lang="ts" setup>
import { ref } from 'vue'

const btnDisable = ref(false)
const btnText = ref("获取验证码")

function sendSMS() {
    let countdown = 60
    btnDisable.value = true
    btnText.value = "重新发送(" + countdown.toString() + ")"
    const id = setInterval(() => {
        if (countdown <= 0 ) {
            clearInterval(id)
            btnText.value = "重新发送"
            btnDisable.value = false
            return
        }
        btnText.value = "重新发送(" + (--countdown).toString() + ")"
    }, 1000)
}
</script>

<template>
    <a-button :disabled="btnDisable" type="default" @click="sendSMS">{{ btnText }}</a-button>
</template>