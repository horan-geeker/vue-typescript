<template>
  <div class="container" justify="center" align="center">
      <div :md="8" align="center">
          <a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx844b3963c0aa164e&redirect_uri=http%3A%2F%2Fapi.wechat.bangshang.net.cn%2Fauth%2Fwechat-callback&response_type=code&scope=snsapi_base&state=a#wechat_redirect">微信授权</a>
      </div>
      <div :md="8" align="center">
        openid:{{ openid }}
      </div>
      <div :md="8" align="center">
          <form @submit.prevent="submitForm">
              <input label="金额" name="amount" :rules="[{ required: true, message: '请输入金额!', min:0.01 }]" v-model.number="formState.amount">
              <button type="submit" size="large">支付</button>
          </form>
        </div>
      </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue';
import { randomString } from '../utils/random'
import { getPrePayParams } from '../service/http'


interface FormState {
  amount?: number;
}

const formState = reactive<FormState>({
});

const openid = 0

onMounted(() => {
})

const submitForm = (values: any) => {
  if (typeof WeixinJSBridge == "undefined") {
    console.log("Not In Wechat Browser")
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    }
  } else {
    onBridgeReady();
    console.log("onBridgeReady")
  }
  console.log('Success:', values);
};

function onBridgeReady() {
  let payParams = {
    "appId": "wx844b3963c0aa164e",     //公众号ID，由商户传入     
    "nonceStr": "", //随机串     
    "package": "",
    "signType": "RSA",         //微信签名方式：     
    "paySign": "", //微信签名 
    "timeStamp": "",         //时间戳，自1970年以来的秒数     
  }
  getPrePayParams(formState.amount * 100, "o9O1L6zPDqLifzfUNTa61ma8aBy4").then(response => {
    const data = response.data.data
    payParams.nonceStr = data.nonceStr
    payParams.package = data.package
    payParams.signType = data.signType
    payParams.paySign = data.paySign
    payParams.timeStamp = data.timeStamp

    WeixinJSBridge.invoke(
      'getBrandWCPayRequest', payParams,
      function (res) {
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          // 使用以上方式判断前端返回,微信团队郑重提示：
          //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
        }
      }
    );
  }).catch(err => {
    console.log(err)
  })
  
}

</script>