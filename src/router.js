import Router from 'vue-router';
import Vue from 'vue'
import Home from './components/TrangChu/Home.vue';
import LopHoc from './components/LopHoc/LopHoc.vue';
import ChiTietLopHoc from './components/LopHoc/ChiTietLopHoc.vue';
import ChiTietHocPhan from './components/LopHoc/ChiTietHocPhan.vue';
import KiemTra from './components/KiemTra/KiemTra.vue';
import HocPhanCuaToi from './components/HocPhanCuaToi/HocPhanCuaToi.vue';


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/trangchu',
      component: Home,
    },
    {
      path: '/lophoc',
      component: LopHoc,
    },
    {
      path: '/chitietlophoc',
      component: ChiTietLopHoc,
    },
    {
      path: '/chitiethocphan',
      component: ChiTietHocPhan,
    },
    {
      path: '/kiemtra',
      component: KiemTra,
    },
    {
      path: '/hocphancuatoi',
      component: HocPhanCuaToi,
    },

  ]
})