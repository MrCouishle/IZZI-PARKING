import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";
import LottieAnimation from "lottie-web-vue";

Vue.config.productionTip = false;
Vue.use(LottieAnimation);

new Vue({
  router,
  store,
  vuetify,
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
