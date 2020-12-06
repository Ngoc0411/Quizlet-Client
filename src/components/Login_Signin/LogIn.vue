<template>
  <v-row justify="center">
    <v-dialog v-model="DialogLogIn" persistent max-width="600px">
      <v-card>
        <v-card-title
          class="title py-8 px-10 white--text"
          style="background-color: #4257b2; font-size: large;"
        >
          Đăng nhập
          <v-spacer></v-spacer>
          <v-btn @click="DialogLogIn = false" small icon class="ma-0" dark>
            <v-icon small>close</v-icon>
          </v-btn>
          
        </v-card-title>
        <v-alert type="error" v-model="ErrorPass">
            {{ ContentError }}
          </v-alert>

        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="email"
                :counter="50"
                label="Email"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Mật khẩu"
                required
                @click:append="show1 = !show1"
              ></v-text-field>

              <v-btn
                :disabled="!valid"
                color="#7188e9"
                class="mr-4 py-8 px-10 white--text"
                style="width:100%"
                @click="DangNhap"
              >
                Đăng nhập
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
import { AUTH_REQUEST } from "../../store/actions/auth";
import { HTTP } from "@/HTTPServices";
import { USER_ACCOUNT } from '../../store/actions/user';
export default {
  components: {},
  data: () => ({
    show1: false,
    DialogLogIn: false,
    i: 0,
    isLogIn: true,
    valid: true,
    password: "",
    email: "",
    select: null,
    checkbox: false,
    account: {},
    ErrorPass: false,
    ContentError: "",
  }),
  created() {
  },
  methods: {
    DangNhap() {
      const { email, password } = this;
      if(this.password == ""){
        this.ErrorPass = true;
        this.ContentError = "Mật khẩu không được bỏ trống, mời nhập lại.";
      }
      if(this.email == ""){
        this.ErrorPass = true;
        this.ContentError = "Email không được bỏ trống, mời nhập lại.";
      }
      HTTP.get("taikhoans/" + this.email + '/' +  this.password).then((response) => {
        if(response.data === ''){
          this.ErrorPass = true;
          this.ContentError = "Tên tài khoản hoặc mật khẩu không chính xác, xin mời nhập lại."
        }
        else{
          this.account = response.data;
          this.$notification.success("Đăng nhập thành công!", {
            infiniteTimer: false,
          });
          this.$store.dispatch(AUTH_REQUEST, { email, password }).then(() => {
            this.$router.push("/");
          });

          this.$store.dispatch(USER_ACCOUNT, this.account).then(() => {});

          this.DialogLogIn = false;
        }
      });  
      // this.$emit("DangNhap");

      // this.DialogLogIn = false;
    },
    reset() {
      //this.$refs.form.reset();
      this.email = "";
      this.password = "";
      this.ErrorPass = false;
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    ShowDialogLogIn() {
      this.DialogLogIn = true;
    },
  },
};
</script>
