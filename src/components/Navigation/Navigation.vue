<template>
  <v-row>
    <v-col cols="2">
      <router-link :to="'/trangchu'"
        ><img
          src="https://assets.themuse.com/uploaded/companies/1195/small_logo.png?v=7d6422900fee9fb8260f55772c5139494801d4c089e33f465e4cce84874b0029"
          alt=""
          height="80px"
      /></router-link>
    </v-col>
    <v-col cols="2"> </v-col>
    <v-col cols="2"> </v-col>
    <v-col cols="3">
    </v-col>
    <v-col v-if="isAuthenticated" cols="3">
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            large
            v-on="on"
            dark
            style="margin-top: 20px; margin-left: 200px;"
          >
            <v-avatar size="60px">
              <img
                :src="HOST + profile.anh"
                alt=""
              />
            </v-avatar>
          </v-btn>
          
        </template>
        <v-list dense>
          <v-list-item-group color="primary">
            <v-list-item @click="HienthiHoSo()">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  Xem hồ sơ
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="logout()">
              <v-list-item-icon>
                <v-icon>login</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  Đăng xuất
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-col>
    <v-col v-if="!isAuthenticated && !authLoading" cols="3">
      <v-row style="margin-top: 20px; font-family: Florence, cursive">
        <v-btn class="ma-2" text color="white" @click="HienthiLogIn()">
          Đăng nhập
        </v-btn>
        <v-btn
          depressed
          class="ma-2"
          color="primary"
          @click="HienthiRegister()"
        >
          Đăng ký
        </v-btn>
      </v-row>
    </v-col>
    <HoSo ref="HoSo"></HoSo>
    <LogIn ref="LogIn"></LogIn>
    <Register ref="Register"></Register>
  </v-row>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import { AUTH_LOGOUT } from "../../store/actions/auth";
import LogIn from "../Login_Signin/LogIn";
import Register from "../Login_Signin/Register";
import HoSo from "../TaiKhoan/HoSo";
import APIS from "../../apisServer";

export default {
  data: () => ({
    HOST: APIS.HOST,
  }),
  name: "navigation",
  components: {
    LogIn,
    Register,
    HoSo,
  },
  methods: {
    logout: function() {
      this.$store.dispatch(AUTH_LOGOUT).then(
        //() => this.$router.push("/")
        );
      this.$notification.success("Đã đăng xuất", { infiniteTimer: false, });
    },
    HienthiLogIn() {
      this.$refs.LogIn.ShowDialogLogIn();
      this.$refs.LogIn.reset();
    },
    HienthiRegister() {
      this.$refs.Register.ShowDialogRegister();
    },
    HienthiHoSo() {
      this.$refs.HoSo.ShowDialogHoSo();
    },
  },
  computed: {
    ...mapGetters(["getProfile", "isAuthenticated", "isProfileLoaded"]),
    ...mapState({
      authLoading: (state) => state.auth.status === "loading",
      profile: state => state.user.profile 
    }),
  },
};
</script>
