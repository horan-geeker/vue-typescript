import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'

// validate init
import { defineRule } from 'vee-validate'
import * as AllRules from '@vee-validate/rules'
Object.keys(AllRules).forEach(rule => {
    defineRule(rule, AllRules[rule]);
})
import { configure } from 'vee-validate';
import { setLocale, localize } from '@vee-validate/i18n';
import zhCN from '@vee-validate/i18n/dist/locale/zh_CN.json';
configure({
    generateMessage: localize({
        zhCN,
    }),
});
setLocale('zhCN')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router).mount('#app')
