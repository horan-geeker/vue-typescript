import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'

// validate init
import { defineRule } from 'vee-validate'
import * as AllRules from '@vee-validate/rules'
import { configure } from 'vee-validate';
import { setLocale, localize } from '@vee-validate/i18n';
import zhCN from './assets/validate_zh_CN.json';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 配置 validate 校验规则
Object.keys(AllRules).forEach((rule: string) => {
    defineRule(rule, AllRules[rule]);
})
// 配置 validate 校验文案
configure({
    generateMessage: localize({
        zhCN,
    }),
});
setLocale('zhCN')

const app = createApp(App)

// 配置插件
app.use(router).mount('#app')
