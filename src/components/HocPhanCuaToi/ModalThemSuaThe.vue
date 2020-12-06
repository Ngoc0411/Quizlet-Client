<template>
  <v-row justify="center">
    <v-dialog v-model="DialogThemSuaThe" persistent max-width="600px">
      <template> </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{
            isUpdate ? "Cập nhật thẻ" : "Thêm thẻ"
          }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="6" class="py-0 px-2">
                <v-row>
                  <v-col cols="12" class="py-0 px-2">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-img
                          v-on="on"
                          :src="imageURL"
                          @click="onPickFile"
                          aspect-ratio="0.75"
                          contain
                          class="info"
                        ></v-img>
                        <v-btn
                          raised
                          class="primary"
                          @click="onPickFile"
                          style="margin-top:10px; margin-left:50px;"
                          >Upload Image</v-btn
                        >
                      </template>
                      <span>Nhấn để thay đổi ảnh</span>
                    </v-tooltip>
                    <input
                      type="file"
                      style="display:none"
                      ref="fileInput"
                      accept="image/*"
                      @change="onFilePicked"
                    />
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="6" class="py-0 px-2">
                <v-row>
                  <v-text-field
                    class="py-0 px-2"
                    v-model="TheDuocChon.ThuatNgu"
                    label="Thuật ngữ"
                  ></v-text-field>
                  <v-textarea
                    class="py-0 px-2"
                    v-model="TheDuocChon.GiaiNghia"
                    label="Giải nghĩa"
                  ></v-textarea>
                  <v-text-field
                    class="py-0 px-2"
                    v-model="TheDuocChon.PhatAm"
                    label="Cách phát âm"
                  ></v-text-field>
                  <v-textarea
                    class="py-0 px-2"
                    v-model="TheDuocChon.CachSuDung"
                    label="Sử dụng"
                  ></v-textarea>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
          <small>* Những trường bắt buộc</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="DialogThemSuaThe = false"
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
    DialogThemSuaThe: false,
    TheDuocChon: {},
    imageURL: "",
    image: null,
    HOST: APIS.HOST,
    idhp: 0,
  }),
  computed: mapState({
    profile: (state) => state.user.profile,
    accid: (state) => state.user.profile.taiKhoanID,
    loaitk: (state) => state.user.profile.loaiTaiKhoanID,
  }),
  methods: {
    onFilePicked(event) {
      const file = event.target.files;
      let filename = file[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("Hãy chọn ảnh hợp lệ.");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageURL = fileReader.result;
      });
      fileReader.readAsDataURL(file[0]);
      this.image = file[0];
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    ShowDialogThemSuaThe(item, idhp, isUpdate) {
      if(idhp !== 0) this.idhp = idhp;
      this.isUpdate = isUpdate;
      this.DialogThemSuaThe = true;
      this.imageURL = this.HOST + item.Anh;
      if (this.isUpdate == true) {
        this.getTheLenDialog(item.TheID);
      } else {
        this.TheDuocChon = {};
      }
    },
    getTheLenDialog(id) {
      HTTP.get("thes/" + id).then((response) => {
        this.TheDuocChon = response.data;
      });
    },
    save() {
      if (this.isUpdate == true) {
        //Cập nhật
        HTTP.put("thes/" + this.TheDuocChon.TheID, this.TheDuocChon).then(
          (res) => {
            this.TheDuocChon = res.data;
            this.DialogThemSuaThe = false;
            this.$emit("getLaiDanhSach");
          }
        );
      } else {
        if(this.loaitk === 1) this.TheDuocChon.HocPhanID = 3;
        else if(this.loaitk === 2) this.TheDuocChon.HocPhanID = this.idhp;
        this.TheDuocChon.TaiKhoanID = this.accid;

        //Xử lí ảnh
        var formData = new FormData();
        formData.append("file", this.image, this.image.name);

        HTTP.post("uploads", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        }).then((res) => {
          this.TheDuocChon.Anh = res.data;
          HTTP.post("thes", this.TheDuocChon).then((res) => {
            this.TheDuocChon = res.data;
            this.DialogThemSuaThe = false;
            this.$emit("getLaiDanhSach");
          });
        });
      }
    },
  },
};
</script>
