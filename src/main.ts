import { createApp } from 'vue'
import "@/styles/index.scss"
import "@/assets/iconfont/iconfont.css";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";

import App from './App.vue'
import router from "@/routers/index.ts"
import directives from "@/directives"
import pinia from "@/stores";

import * as Icons from "@element-plus/icons-vue";
import ElementPlus from "element-plus";

// import VueCron from 'vue-cron'


const app = createApp(App);
Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key as keyof typeof Icons]);
});
app.use(directives).use(ElementPlus).use(pinia).use(router).mount('#app')
