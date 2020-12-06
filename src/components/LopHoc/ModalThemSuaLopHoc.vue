<template>
  <v-row justify="center">
    <v-dialog v-model="DialogThemSuaLopHoc" persistent max-width="600px">
      <template> </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{
            isUpdate ? "Cập nhật lớp học" : "Thêm lớp học"
          }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              class="py-0 px-2"
              v-model="LopDuocChon.TenLopHoc"
              label="Tên lớp học"
            ></v-text-field>
            <v-textarea
              class="py-0 px-2"
              v-model="LopDuocChon.MoTa"
              label="Mô tả"
            ></v-textarea>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="DialogThemSuaLopHoc = false"
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
    DialogThemSuaLopHoc: false,
    LopDuocChon: {},
    imageURL: "",
    image: null,
    HOST: APIS.HOST,
  }),
  computed: mapState({
    profile: (state) => state.user.profile,
    accid: (state) => state.user.profile.taiKhoanID,
  }),
  methods: {
    ShowDialogThemSuaLopHoc(item, isUpdate) {
      this.isUpdate = isUpdate;
      this.DialogThemSuaLopHoc = true;
      if (this.isUpdate == true) {
        this.getLopHocLenDialog(item.LopHocID);
      } else {
        this.LopDuocChon = {};
      }
    },
    getLopHocLenDialog(id) {
      HTTP.get("lophocs/" + id).then((response) => {
        this.LopDuocChon = response.data;
      });
    },
    save() {
      if (this.isUpdate == true) {
        //Cập nhật
        HTTP.put("lophocs/" + this.LopDuocChon.LopHocID, this.LopDuocChon).then(
          (res) => {
            this.LopDuocChon = res.data;
            this.DialogThemSuaLopHoc = false;
            this.$emit("getLaiDanhSach");
          }
        );
      } else {
        //Thêm
        this.LopDuocChon.TaiKhoanID = this.accid;
        HTTP.post("lophocs", this.LopDuocChon).then((res) => {
          this.TheDuocChon = res.data;
          this.DialogThemSuaLopHoc = false;
          this.$emit("getLaiDanhSach");
        });
      }
    },
  },
};
</script>
