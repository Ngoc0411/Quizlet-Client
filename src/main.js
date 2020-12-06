import Vue from 'vue';
import App from './App.vue';
import router from './router' ;
import vuetify from './plugins/vuetify';
import Vuex from 'vuex';
import store from "./store";
import "./plugins/vuetify.js";

import VueNotification from "@kugatsu/vuenotification";
Vue.use(Vuex);
Vue.use(VueNotification, {
  timer: 5,
  position: "bottomRight",
});
// Vue.use(VueNotification, {
//  error: {
//    background: "green",
//    color: "red"
//  }
// });
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
