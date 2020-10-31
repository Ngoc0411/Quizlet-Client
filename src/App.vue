<template>
  <v-app style="background-color: #f6f7fb">
    <v-app-bar app color="#4257b2" dark height="80px">
      <v-row>
        <v-col cols="2">
          <router-link :to="'/trangchu'">
            <img
              src="https://assets.themuse.com/uploaded/companies/1195/small_logo.png?v=7d6422900fee9fb8260f55772c5139494801d4c089e33f465e4cce84874b0029"
              alt=""
              style="height:80px;"
            />
          </router-link>
        </v-col>
        <v-col cols="2"> </v-col>
        <v-col cols="2"> </v-col>
        <v-col cols="4"> </v-col>
        <v-col cols="2">
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                large
                v-on="on"
                dark
                style="margin-top: 20px; margin-left: 150px"
              >
                <v-avatar size="40px">
                  <img
                    src="https://public.potaufeu.asahi.com/44c6-p/picture/20354670/2edac91a20a3ca1d3a822c17f7315cbd.jpg"
                    alt=""
                  />
                </v-avatar>
              </v-btn>
            </template>
            <v-list>
              <v-list-item :to="'taikhoancuatoi'">
                <v-list-item-title>
                  Tài khoản của tôi
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-main>
      <v-row v-if="OnApp == true">
        <v-col cols="sm-2 xs-1">
          <left-side-bar></left-side-bar>
        </v-col>
        <v-col cols="sm-8 xs-9">
          <v-container fluid fill-height grid-list-md>
            <v-layout justify-center>
              <router-view></router-view>
            </v-layout>
            <vue-snotify></vue-snotify>
          </v-container>
        </v-col>
        <v-col cols="sm-2"> </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import LeftSideBar from "./components/Layout/LeftSideBar";
//import SignUp from "./components/SignUp/SignUp";
export default {
  name: "App",

  components: {
    LeftSideBar,
  },

  data: () => ({
    OnApp: true,
  }),
};
</script>
