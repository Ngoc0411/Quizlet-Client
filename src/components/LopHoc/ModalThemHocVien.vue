<template>
  <v-row justify="center">
    <v-dialog v-model="DialogThemHocVien" persistent max-width="600px">
      <template> </template>
      <v-card>
        <v-card-title>
          <span class="headline">
            Thêm học viên
          </span>
        </v-card-title>
        <v-alert type="error" v-model="ErrorPass">
          {{ ContentError }}
        </v-alert>
        <v-card-text>
          <v-container>
            <v-text-field
              class="py-0 px-2"
              v-model="HocVienDuocChon.Email"
              label="Nhập email học viên bạn muốn thêm vào lớp"
            ></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="DialogThemHocVien = false"
            >Hủy</v-btn
          >
          <v-btn color="blue darken-1" text @click="save()">Thêm mới</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { HTTP } from "@/HTTPServices";
import { mapState } from "vuex";
import APIS from "../../apisServer";
export default {
  data: () => ({
    DialogThemHocVien: false,
    HocVienDuocChon: {},
    HocVienLopHoc: {},
    imageURL: "",
    image: null,
    HOST: APIS.HOST,
    lhid: 0,
    ErrorPass: false,
    ContentError: "",
  }),
  computed: mapState({
    profile: (state) => state.user.profile,
    accid: (state) => state.user.profile.taiKhoanID,
  }),
  methods: {
    ShowDialogThemHocVien(item, lhid) {
      this.lhid = lhid;
      this.DialogThemHocVien = true;
      this.HocVienDuocChon = {};
      this.ErrorPass = false;
    },
    save() {
      //Kiểm tra email tồn tại hay chưa:
      HTTP.get("lophochocsinhs/" + this.HocVienDuocChon.Email).then((response) => {
        if (response.data === "") {
          this.ErrorPass = true;
          this.ContentError = "Email không phải của bất kì tài khoản nào.";
        } else {
          this.HocVienDuocChon = response.data;
          this.HocVienLopHoc.TaiKhoanID = this.HocVienDuocChon.TaiKhoanID;
          this.HocVienLopHoc.LopHocID = this.lhid;

          HTTP.post("lophochocsinhs", this.HocVienLopHoc).then((res) => {
            this.HocVienLopHoc = res.data;
            this.DialogThemHocVien = false;
            this.$emit("getLaiDanhSach");
          });
        }
      });
    },
  },
};
</script>
