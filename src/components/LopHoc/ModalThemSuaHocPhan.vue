<template>
  <v-row justify="center">
    <v-dialog v-model="DialogThemSuaHocPhan" persistent max-width="600px">
      <template> </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{
            isUpdate ? "Cập nhật học phần" : "Thêm học phần"
          }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              class="py-0 px-2"
              v-model="HocPhanDuocChon.TenHocPhan"
              label="Tên học phần"
            ></v-text-field>
            <v-textarea
              class="py-0 px-2"
              v-model="HocPhanDuocChon.MoTa"
              label="Mô tả"
            ></v-textarea>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="DialogThemSuaHocPhan = false"
            >Hủy</v-btn
          >
          <v-btn color="blue darken-1" text @click="save()">{{
            isUpdate ? "Cập nhật" : "Thêm mới"
          }}</v-btn>
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
    isUpdate: false,
    DialogThemSuaHocPhan: false,
    LopDuocChon: {},
    HocPhanDuocChon: {},
    imageURL: "",
    image: null,
    HOST: APIS.HOST,
    lhid: 0,
  }),
  computed: mapState({
    profile: (state) => state.user.profile,
    accid: (state) => state.user.profile.taiKhoanID,
  }),
  methods: {
    ShowDialogThemSuaHocPhan(item, isUpdate, lhid) {
      this.isUpdate = isUpdate;
      this.lhid = lhid;
      
      if (this.isUpdate === true) {
        this.getHocPhanLenDialog(item.HocPhanID);
      } else {
        this.HocPhanDuocChon = {};
      }
      this.DialogThemSuaHocPhan = true;
    },
    getHocPhanLenDialog(id) {
      HTTP.get("hocphans/" + id).then((response) => {
        this.HocPhanDuocChon = response.data;
      });
    },
    save() {
      if (this.isUpdate == true) {
        //Cập nhật
        HTTP.put("hocphans/" + this.HocPhanDuocChon.HocPhanID, this.HocPhanDuocChon).then(
          (res) => {
            this.HocPhanDuocChon = res.data;
            this.DialogThemSuaHocPhan = false;
            this.$emit("getLaiDanhSach");
          }
        );
      } else {
        //Thêm
        this.HocPhanDuocChon.TaiKhoanID = this.accid;
        this.HocPhanDuocChon.LopHocID = this.lhid;
        HTTP.post("hocphans", this.HocPhanDuocChon).then((res) => {
          this.HocPhanDuocChon = res.data;
          this.DialogThemSuaHocPhan = false;
          this.$emit("getLaiDanhSach");
        });
      }
    },
  },
};
</script>
