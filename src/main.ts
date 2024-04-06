import './assets/main.css'
// 引入 bootstrap 样式
import 'bootstrap/dist/css/bootstrap.css'
// 注册 antdesign
import Antd from 'ant-design-vue';
// 引入 antdesign 样式
import 'ant-design-vue/dist/reset.css';
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
app.use(Antd).use(router).mount('#app')
