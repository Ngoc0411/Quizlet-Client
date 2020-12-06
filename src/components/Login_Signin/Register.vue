<template>
  <v-row justify="center">
    <v-dialog v-model="DialogRegister" persistent max-width="600px">
      <v-card>
        <v-card-title
          class="title py-8 px-10 white--text"
          style="background-color: #4257b2; font-size: large;"
        >
          Đăng ký
          <v-spacer></v-spacer>
          <v-btn @click="DialogRegister = false" small icon class="ma-0" dark>
            <v-icon small>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-row>
                  <v-col cols="12" md="6" class="py-0 px-2">
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
                          style="margin-top:10px; margin-left:50px; margin-bottom: 10px;"
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
                  <v-col cols="12" md="6" class="py-0 px-2">
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
                          label="Ngày sinh"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="picker"
                        v-model="date"
                        :max="new Date().toISOString().substr(0, 10)"
                        min="1950-01-01"
                        @change="save"
                      ></v-date-picker>
                    </v-menu>

                    <v-text-field
                      v-model="TaiKhoan.TenNguoiDung"
                      :counter="20"
                      :rules="nameRules"
                      label="Tên người dùng"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="TaiKhoan.Email"
                      :counter="50"
                      :rules="emailRules"
                      label="Email"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="TaiKhoan.MatKhau"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="passwordRules"
                      :type="show1 ? 'text' : 'password'"
                      name="input-10-1"
                      label="Mật khẩu"
                      required
                      @click:append="show1 = !show1"
                    ></v-text-field>

                    <v-select
                      v-model="vt"
                      :items="Vaitros"
                      :rules="[(v) => !!v || 'Item is required']"
                      label="Bạn là?"
                      required
                    ></v-select>
                  </v-col>
                </v-row>
              </v-row>

              <v-btn
                :disabled="!valid"
                color="#7188e9"
                class="mr-4 py-8 px-10 white--text"
                style="width:100%"
                @click="DangKy()"
              >
                Đăng ký
              </v-btn>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions> </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { HTTP } from "@/HTTPServices";
export default {
  components: {},
  data: () => ({
    show1: false,
    date: null,
    vt: "",
    imageURL: "",
    menu: false,
    DialogRegister: false,
    i: 0,
    isLogIn: true,
    valid: true,
    nameRules: [
      (v) => !!v || "Tên là bắt buộc",
      (v) => (v && v.length <= 20) || "Name must be less than 20 characters",
    ],
    password: "",
    username: "",
    email: "",
    passwordRules: [
      (v) => !!v || "Mật khẩu là bắt buộc",
      (v) => (v && v.length >= 6) || "Mật khẩu phải chứa ít nhất 6 kí tự",
    ],
    emailRules: [(v) => !!v || "Email là bắt buộc"],
    select: null,
    checkbox: false,
    Vaitros: ["Giáo Viên", "Học Viên"],

    TaiKhoan: {},
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
    save(date) {
      this.$refs.menu.save(date);
    },
    DangKy() {
      if (this.$refs.form.validate()) {
        this.TaiKhoan.NgaySinh = this.date;
        if (this.vt == "Học Viên") this.TaiKhoan.LoaiTaiKhoanID = 1;
        else this.TaiKhoan.LoaiTaiKhoanID = 2;

        var formData = new FormData();
        formData.append("file", this.image, this.image.name);

        HTTP.post("uploads", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        }).then((res) => {
          this.TaiKhoan.Anh = res.data;
          HTTP.post("taikhoans", this.TaiKhoan).then((res) => {
          this.TaiKhoan = res.data;
          this.DialogRegister = false;
          this.$notification.success("Đăng kí tài khoản thành công!", {
            infiniteTimer: false,
          });
        });
        });
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    ShowDialogRegister() {
      this.DialogRegister = true;
    },
  },
};
</script>
