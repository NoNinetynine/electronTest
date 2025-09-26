import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import VueLuckyCanvas from "@lucky-canvas/vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(router).use(ElementPlus).use(pinia).use(VueLuckyCanvas).mount("#app");
