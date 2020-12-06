<template>
  <v-card width="100%">
    <v-container fluid grid-list-md>
      <v-layout>
        <v-flex xs12>
          <v-card id="lateral" width="100%">
            <v-toolbar dark tabs flat color="brown darken-1">
              <v-toolbar-title><h3 style="text-align: center; margin-top:5px;">
              {{ currentLopHoc.TenLopHoc }}
            </h3></v-toolbar-title>
              <v-spacer></v-spacer>
              <!-- <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn> -->
              <template v-slot:extension>
                <v-tabs align-with-title>
                  <v-tab @click="getDanhSachHocPhan(currentLopHoc.LopHocID)">
                    Học phần
                  </v-tab>
                  <v-tab @click="getDanhSachHocVien(currentLopHoc.LopHocID)">
                    Thành viên
                  </v-tab>
                  <v-tabs-slider color="pink"></v-tabs-slider>
                </v-tabs>
              </template>
            </v-toolbar>
            <v-card v-if="idHocPhanThanhVien == 0">
              <v-row>
                <v-col cols="3">
                  <v-text-field
                  style="margin-left: 10px"
                    append-icon="search"
                    label="Search..."
                  ></v-text-field>
                </v-col>
                <v-col cols="8"></v-col>
                <v-col cols="1">
                  <v-btn
                    v-if="this.lAcid === 2"
                    @click="showModalThemSuaHocPhan({}, false, idlh)"
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
                v-if="this.lAcid === 2"
                :headers="headers0"
                :items="danhSachHocPhan"
                :items-per-page="15"
                class="elevation-1"
                style="width : 100%"
              >
                <template v-slot:item.TenHocPhan="{ item }">
                  <router-link :to="'/quanlichitiethocphan/' + item.HocPhanID">{{
                    item.TenHocPhan
                  }}</router-link>
                </template>
                <template v-slot:item.thaotac="{ item }" >
                  <v-btn
                    icon
                    class="mx-0"
                    @click="showModalThemSuaHocPhan(item, true, idlh)"
                  >
                    <v-icon color="teal">edit</v-icon>
                  </v-btn>
                  <v-btn icon class="mx-0" @click="XacNhanXoaHocPhan(item)">
                    <v-icon color="red">delete</v-icon>
                  </v-btn>
                </template>
              </v-data-table>
              <v-data-table
                v-if="this.lAcid === 1"
                :headers="headers3"
                :items="danhSachHocPhan"
                :items-per-page="15"
                class="elevation-1"
                style="width : 100%"
              >
                <template v-slot:item.TenHocPhan="{ item }">
                  <router-link :to="'/chitiethocphan/' + item.HocPhanID">{{
                    item.TenHocPhan
                  }}</router-link>
                </template>
              </v-data-table>
            </v-card>

            <v-card v-if="idHocPhanThanhVien == 1">
              <v-row>
                <v-col cols="3">
                  <v-text-field
                  style="margin-left: 10px"
                    append-icon="search"
                    label="Search..."
                  ></v-text-field>
                </v-col>
                <v-col cols="8"></v-col>
                <v-col cols="1">
                  <v-btn
                    v-if="this.lAcid === 2"
                    @click="showModalThemHocVien({}, idlh)"
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
              v-if="this.lAcid === 2"
              :headers="headers1"
              :items="danhSachHocVien"
              :items-per-page="15"
              class="elevation-1"
              style="width : 100%"
            >
            <template v-slot:item.HinhAnh="{ item }">
                  <img
                    v-if="item.Anh != null"
                    :src="HOST + item.Anh"
                    style="height:50px; margin-top:4px;"
                  />
                </template>
            <template  v-slot:item.thaotac="{ item }" >
                  <v-btn icon class="mx-0" @click="XacNhanXoaHocVien(item)">
                    <v-icon color="red">delete</v-icon>
                  </v-btn>
                </template>
            </v-data-table>
            <v-data-table
              v-if="this.lAcid === 1"
              :headers="headers2"
              :items="danhSachHocVien"
              :items-per-page="15"
              class="elevation-1"
              style="width : 100%"
            >
            <template v-slot:item.HinhAnh="{ item }">
                  <img
                    v-if="item.Anh != null"
                    :src="HOST + item.Anh"
                    style="height:50px; margin-top:4px;"
                  />
                </template>
            </v-data-table>

            </v-card>
            
          </v-card>
        </v-flex>

        <modal-them-sua-hoc-phan
          ref="ModalThemSuaHocPhan"
          @getLaiDanhSach="getDanhSachHocPhan(idlh)"
        ></modal-them-sua-hoc-phan>
        <modal-them-hoc-vien
          ref="ModalThemHocVien"
          @getLaiDanhSach="getDanhSachHocVien(idlh)"
        ></modal-them-hoc-vien>
        <v-dialog v-model="dialogDeleteHP" persistent max-width="400">
          <v-card>
            <v-card-title class="headline">Xác nhận xóa học phần</v-card-title>
            <v-card-text
              >Bạn có chắc chắn muốn xóa học phần này không ?</v-card-text
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click.native="dialogDeleteHP = false" text>Hủy</v-btn>
              <v-btn color="green darken-1" text @click="XoaHocPhan()">Xóa</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDeleteHV" persistent max-width="400">
          <v-card>
            <v-card-title class="headline">Xác nhận xóa học viên</v-card-title>
            <v-card-text
              >Bạn có chắc chắn muốn xóa học viên này khỏi lớp không? ?</v-card-text
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click.native="dialogDeleteHV = false" text>Hủy</v-btn>
              <v-btn color="green darken-1" text @click="XoaHocVien()">Xóa</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import APIS from "../../apisServer";
import { HTTP } from "@/HTTPServices";
import ModalThemSuaHocPhan from "./ModalThemSuaHocPhan.vue";
import ModalThemHocVien from "./ModalThemHocVien.vue";
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    ModalThemSuaHocPhan,
    ModalThemHocVien,
  },
  data() {
    return {
      currentLopHoc: {},
      idHocPhanThanhVien: 0,
      headers0: [
        {
          isUpdate: false,
          search: "",
          text: "Hoc phan",
          align: "center",
          sortable: false,
          value: "TenHocPhan",
        },
        { text: "Mô tả", value: "MoTa", align: "center" },
        { text: "Số thẻ", value: "Soluongthe", align: "center" },
        { text: "Thao tác", value: "thaotac", align: "center" },
      ],
      headers3: [
        {
          isUpdate: false,
          search: "",
          text: "Hoc phan",
          align: "center",
          sortable: false,
          value: "TenHocPhan",
        },
        { text: "Mô tả", value: "MoTa", align: "center" },
        { text: "Số thẻ", value: "Soluongthe", align: "center" },
      ],
      danhSachHocPhan: [],
      headers1: [
        {
          isUpdate: false,
          search: "",
          text: "Ten thanh vien",
          align: "center",
          sortable: false,
          value: "TenNguoiDung",
        },
        { text: "Hình ảnh", value: "HinhAnh", align: "center" },
        { text: 'Ngày sinh', value: 'NgaySinh', align: 'center'},
        { text: 'Email', value: 'Email', align: 'center'},
        { text: "Loại tài khoản", value: "TenLoaiTaiKhoan", align: 'center'},
        { text: "Xóa học viên", value: "thaotac", align: "center" },
      ],
      headers2: [
        {
          isUpdate: false,
          search: "",
          text: "Ten thanh vien",
          align: "center",
          sortable: false,
          value: "TenNguoiDung",
        },
        { text: "Hình ảnh", value: "HinhAnh", align: "center" },
        { text: 'Ngày sinh', value: 'NgaySinh', align: 'center'},
        { text: 'Email', value: 'Email', align: 'center'},
        { text: "Loại tài khoản", value: "TenLoaiTaiKhoan", align: 'center'},
      ],
      danhSachHocVien: [],
      items: [],
      HOST: APIS.HOST,
      idlh: 0,
      HPCanXoa: {},
      HVCanXoa: {},
      dialogDeleteHP: false,
      dialogDeleteHV: false,
    };
  },
  computed: mapState({ lAcid: (state) => state.user.profile.loaiTaiKhoanID }),
  created() {
    this.idlh = parseInt(this.$route.params.id);
    this.getLopHocById(this.idlh);
    this.getDanhSachHocPhan(this.idlh);
  },
  methods: {
    showModalThemSuaHocPhan(item, isUpdate, idlh) {
      this.$refs.ModalThemSuaHocPhan.ShowDialogThemSuaHocPhan(item,isUpdate,idlh);
    },
    showModalThemHocVien(item, idlh){
      this.$refs.ModalThemHocVien.ShowDialogThemHocVien(item,idlh);
    },
    getLopHocById(id) {
      HTTP.get("lophocs/" + id).then((response) => {
        this.currentLopHoc = response.data;
      });
    },
    getDanhSachHocPhan(idlh) {
      this.idHocPhanThanhVien = 0;
      HTTP.get("hocphans/" + idlh + "/" + "abc").then((response) => {
        this.danhSachHocPhan = response.data;
      });
    },
    getDanhSachHocVien(idlh) {
      this.idHocPhanThanhVien = 1;
      HTTP.get("taikhoans/" + idlh).then((response) => {
        this.danhSachHocVien = response.data;
      });
    },
    XacNhanXoaHocPhan(item) {
      this.dialogDeleteHP = true;
      this.HPCanXoa = item;
    },
    XacNhanXoaHocVien(item) {
      this.dialogDeleteHV = true;
      this.HVCanXoa = item;
    },
    XoaHocPhan() {
      HTTP.delete("hocphans/" + this.HPCanXoa.HocPhanID).then((response) => {
        console.log(response);
        this.getDanhSachHocPhan(this.idlh);
        this.dialogDeleteHP = false;
      });
    },
    XoaHocVien() {
      HTTP.delete("lophochocsinhs/" + this.HVCanXoa.TaiKhoanID + "/" + this.idlh + "/" + "def" + "/" + "ghi").then((response) => {
        console.log(response);
        this.getDanhSachHocVien(this.idlh);
        this.dialogDeleteHV = false;
      });
    },
  },
};
</script>
