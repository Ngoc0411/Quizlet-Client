<template>
  <v-card width="100%">
    <v-container fluid grid-list-md>
      <v-layout>
        <v-flex xs12>
          <v-app-bar
            color="brown darken-1"
            dark
            scroll-target="#scrolling-techniques-6"
          >
            <h2 style="text-align: center; margin-top:5px;">
              Danh sách lớp học của tôi
            </h2>
          </v-app-bar>

          <br /><br />
          <v-data-table
            :headers="headers"
            :items="danhSachLopHoc"
            :items-per-page="15"
            class="elevation-1"
            style="width : 100%"
          >
            <template v-slot:item.LopHoc.TenLopHoc="{ item }">
              <router-link :to="'/chitietlophoc/' + item.LopHoc.LopHocID">{{
                item.LopHoc.TenLopHoc
              }}</router-link>
            </template>
            <template v-slot:item.TenLopHoc="{ item }">
              <router-link :to="'/chitietlophoc'">{{
                item.TenLopHoc
              }}</router-link>
            </template>
            <template v-slot:item.HinhAnh="{ item }">
              <img
                v-if="item.LopHoc.TaiKhoan.Anh != null"
                :src="HOST + item.LopHoc.TaiKhoan.Anh"
                style="height:50px; margin-top:4px;"
              />
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>
<script>
import APIS from "../../apisServer";
import { HTTP } from "@/HTTPServices";
import { mapState } from "vuex";
export default {
  name: "App",
  components: {},
  data() {
    return {
      headers: [
        {
          isUpdate: false,
          search: "",
          text: "Tên lớp học",
          align: "center",
          sortable: false,
          value: "LopHoc.TenLopHoc",
        },
        {
          text: "Giáo viên",
          value: "LopHoc.TaiKhoan.TenNguoiDung",
          align: "center",
        },
        { text: "Ảnh giáo viên", value: "HinhAnh", align: "center" },
        { text: "Mô tả", value: "LopHoc.MoTa", align: "center" },
        { text: "Số lượng học phần", value: "SoLuongHocPhan", align: "center" },
        {
          text: "Số lượng thành viên",
          value: "SoLuongHocVien",
          align: "center",
        },
      ],
      danhSachLopHoc: [],
      HOST: APIS.HOST,
    };
  },
  computed: mapState({ id: (state) => state.user.profile.taiKhoanID }),
  created() {
    this.getLopHocs();
  },
  methods: {
    getLopHocs() {
      HTTP.get("lophochocsinhs/" + this.id + "/" + "abc").then((response) => {
        this.danhSachLopHoc = response.data;
      });
    },
  },
};
</script>
