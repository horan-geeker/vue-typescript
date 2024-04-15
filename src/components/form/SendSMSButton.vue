<script lang="ts" setup>
import { ref } from 'vue'
import api from '@/service/http'

const btnDisable = ref(false)
const btnText = ref("获取验证码")
const props = defineProps(["phone"])
const emit = defineEmits(['validatePhone'])

function sendSMS() {
    if (props.phone == undefined) {
        return emit("validatePhone", false, "请输入手机号")
    }
    if (props.phone.length != 11) {
        return emit("validatePhone", false, "手机号必须是数字，且精确到11位数")
    }
    api.notify.sendSMSCode(props.phone).then(() => {
        let countdown = 60
        btnDisable.value = true
        btnText.value = "重新发送(" + countdown.toString() + ")"
        const id = setInterval(() => {
            if (countdown <= 0) {
                clearInterval(id)
                btnText.value = "重新发送"
                btnDisable.value = false
                return
            }
            btnText.value = "重新发送(" + (--countdown).toString() + ")"
        }, 1000)
    }
    ).catch((err) => console.log(err))
}
</script>

<template>
    <a-button :disabled="btnDisable" type="default" @click.prevent="sendSMS">{{ btnText }}</a-button>
</template>