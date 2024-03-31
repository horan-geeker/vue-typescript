<template>
  <div class="container" justify="center" align="center">
    <div :md="8" align="center">
      <a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx844b3963c0aa164e&redirect_uri=http%3A%2F%2Fapi.wechat.bangshang.net.cn%2Fauth%2Fwechat-callback&response_type=code&scope=snsapi_base&state=a#wechat_redirect">微信授权</a>
    </div>
    <div :md="8" align="center">
      openid:{{ openid }}
    </div>
    <div :md="8" align="center">
      <WechatPay/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import  WechatPay from '../components/pay/WechatPay.vue'

var openid = 0

onMounted(() => {
  this.$api.user.getUserInfo().then(response => {
    const data = response.data.data
    openid = data.openid
  }).catch(err =>  {
    console.log(err)
  })
})


</script>