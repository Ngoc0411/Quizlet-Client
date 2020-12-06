<template>
  <v-row justify="center">
    <v-dialog v-model="DialogHoSo" persistent max-width="600px">
      <v-card>
        <v-card-title
          class="title py-8 px-10 white--text"
          style="background-color: #4257b2; font-size: large;"
        >
          Hồ sơ của bạn
          <v-spacer></v-spacer>
          <v-btn @click="DialogHoSo = false" small icon class="ma-0" dark>
            <v-icon small>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-row>
                  <v-col cols="12" md="6" class="py-0 px-2">
                    <v-tooltip>
                      <template v-slot:activator="{ on }">
                        <v-img
                          v-on="on"
                          :src="imageURL"
                          aspect-ratio="0.75"
                          contain
                          class="info"
                        ></v-img>
                      </template>
                    </v-tooltip>
                    <input
                      type="file"
                      style="display:none"
                      ref="fileInput"
                      accept="image/*"
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
                          v-model="profile.ngaySinh"
                          label="Birthday date"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                    </v-menu>

                    <v-text-field
                      v-model="profile.tenNguoiDung"
                      :counter="20"
                      label="Username"
                      readonly
                    ></v-text-field>

                    <v-text-field
                      v-model="profile.email"
                      :counter="50"
                      label="Email"
                      readonly
                    ></v-text-field>

                    <v-text-field
                      v-model="profile.tenLoaiTaiKhoan"
                      label="Loại tài khoản:"
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions> </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapState } from "vuex";
import APIS from "../../apisServer";
export default {
  components: {},
  data: () => ({
    date: null,
    menu: false,
    DialogHoSo: false,
    i: 0,
    isLogIn: true,
    valid: true,
    HOST: APIS.HOST,
    password: "",
    username: "",
    email: "",
    imageURL: "",
    select: null,
    checkbox: false,
    Vaitros: ["Giáo Viên", "Học Sinh"],

    account: {},
  }),
  computed: mapState({ profile: (state) => state.user.profile }),
  created() {
    
  },
  methods: {
    validate() {
      this.$refs.form.validate();
      this.$emit("changeIsLogIn");
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    ShowDialogHoSo() {
      this.imageURL = this.HOST + this.profile.anh;
      this.DialogHoSo = true;
    },
  },
};
</script>
