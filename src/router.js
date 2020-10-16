import Router from 'vue-router';
import Vue from 'vue'
import Home from './components/TrangChu/Home.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/trangchu',
      component: Home,
    },
  ]
})
