<template>
  <v-card width="100%">
    <v-container fluid grid-list-md>
      <v-layout>
        <v-flex xs12>
          <v-layout>
            <v-flex xs12>
              <v-app-bar
            color="blue lighten-2"
            dark
            scroll-target="#scrolling-techniques-6"
          >
            <h2 style="text-align: center; margin-top:5px;">
              Quản lí các lớp học của tôi
            </h2>
          </v-app-bar>
              <v-row>
                <v-col cols="3">
                  <v-text-field
                    append-icon="search"
                    label="Search..."
                    v-model="searchKeywords"
                    @input="timKiemLopHoc"
                  ></v-text-field>
                </v-col>
                <v-col cols="8"></v-col>
                <v-col cols="1">
                  <v-btn
                    @click="showModalThemSua({}, false)"
                    small
                    class="my-2 mt-5 mr-2"
                    fab
                    dark
                    color="primary"
                  >
                    <v-icon dark>mdi-plus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-data-table
                :headers="headers"
                :items="danhSachLopHoc"
                :items-per-page="15"
                class="elevation-1"
                style="width : 100%"
              >
                <template v-slot:item.TenLopHoc="{ item }">
                  <router-link :to="'/chitietlophoc/'+item.LopHocID">{{
                    item.TenLopHoc
                  }}</router-link>
                </template>
                <template v-slot:item.thaotac="{ item }">
                  <v-btn
                    icon
                    class="mx-0"
                    @click="showModalThemSua(item, true)"
                  >
                    <v-icon color="teal">edit</v-icon>
                  </v-btn>
                  <v-btn icon class="mx-0" @click="XacNhanXoaLopHoc(item)">
                    <v-icon color="red">delete</v-icon>
                  </v-btn>
                </template>
              </v-data-table>
            </v-flex>
            <modal-them-sua-lop-hoc
              ref="ModalThemSuaLopHoc"
              @getLaiDanhSach="getLopHocs()"
            ></modal-them-sua-lop-hoc>
          </v-layout>
        </v-flex>
        <v-dialog v-model="dialogDelete" persistent max-width="400">
          <v-card>
            <v-card-title class="headline">Xác nhận xóa lớp học</v-card-title>
            <v-card-text
              >Bạn có chắc chắn muốn xóa lớp học này không ?</v-card-text
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click.native="dialogDelete = false" text>Hủy</v-btn>
              <v-btn color="green darken-1" text @click="XoaLopHoc()">Xóa</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-container>
  </v-card>
</template>
<script>
import { HTTP } from "@/HTTPServices";
import { mapState } from "vuex";
import ModalThemSuaLopHoc from "./ModalThemSuaLopHoc.vue";
export default {
  name: "App",
  components: {
    ModalThemSuaLopHoc,
  },
  data() {
    return {
      headers: [
        {
          isUpdate: false,
          search: "",
          text: "Tên lớp học",
          align: "center",
          sortable: false,
          value: "TenLopHoc",
        },
        { text: "Mô tả", value: "MoTa", align: "center" },
        { text: "Số lượng học phần", value: "SoLuongHocPhan", align: "center" },
        {
          text: "Số lượng thành viên",
          value: "SoLuongHocVien",
          align: "center",
        },
        { text: "Ngày tạo", value: "NgayTao", align: "center" },
        { text: "Thao tác", value: "thaotac", align: "center" },
      ],
      danhSachLopHoc: [],
      lopHocCanXoa:{},
      dialogDelete: false,
      searchKeywords: "",
    };
  },
  computed: mapState({
    profile: (state) => state.user.profile,
    accid: (state) => state.user.profile.taiKhoanID,
  }),
  created() {
    this.getLopHocs();
  },
  methods: {
    getLopHocs() {
      HTTP.get("lophocs/" + this.accid + "/" + "all").then((response) => {
        this.danhSachLopHoc = response.data;
      });
    },
    showModalThemSua(item, isUpdate) {
      this.$refs.ModalThemSuaLopHoc.ShowDialogThemSuaLopHoc(item, isUpdate);
    },
    XacNhanXoaLopHoc(item) {
      this.dialogDelete = true;
      this.lopHocCanXoa = item;
    },
    XoaLopHoc() {
      HTTP.delete("lophocs/" + this.lopHocCanXoa.LopHocID).then((response) => {
        console.log(response);
        this.getLopHocs();
        this.dialogDelete = false;
      });
    },
    timKiemLopHoc() {
    //  HTTP.get("lophocs/" + this.accid + "/" + this.searchKeywords).then((response) => {
    //     this.danhSachLopHoc = response.data;
    //  });
    },
  },
};
</script>
