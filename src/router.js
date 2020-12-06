import Router from 'vue-router';
import Vue from 'vue'
import Home from './components/TrangChu/Home.vue';
import LopHoc from './components/LopHoc/LopHoc.vue';
import QuanLiLopHoc from './components/LopHoc/QuanLiLopHoc.vue';
import ChiTietLopHoc from './components/LopHoc/ChiTietLopHoc.vue';
import ChiTietHocPhan from './components/LopHoc/ChiTietHocPhan.vue';
import KiemTra from './components/KiemTra/KiemTra.vue';
import QuanLiChiTietHocPhan from './components/LopHoc/QuanLiChiTietHocPhan'
import HocPhanCuaToi from './components/HocPhanCuaToi/HocPhanCuaToi.vue';
import HoSo from './components/TaiKhoan/HoSo.vue';
import store from "./store";

Vue.use(Router);

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/");
};
export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      component: Home,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/trangchu',
      component: Home,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/lophoc',
      component: LopHoc,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/chitietlophoc/:id',
      component: ChiTietLopHoc,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/chitiethocphan/:id',
      component: ChiTietHocPhan,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/quanlichitiethocphan/:id',
      component: QuanLiChiTietHocPhan,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/kiemtra',
      component: KiemTra,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/hocphancuatoi',
      component: HocPhanCuaToi,
      beforeEnter: ifAuthenticated
    },
    {
      path: "/hosocuatoi",
      name: "HoSo",
      component: HoSo,
      beforeEnter: ifAuthenticated
    },
    {
      path: "/quanlilophoc",
      name: "QuanLiLopHoc",
      component: QuanLiLopHoc,
      beforeEnter: ifAuthenticated
    },
  ]
})
