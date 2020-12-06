<template>
  <v-card width="100%">
    <v-app style="background-color: #f6f7fb">
      <v-app-bar app color="#4257b2" dark height="80px">
        <navigation />
      </v-app-bar>
      
      <v-main>
        <v-row v-if="!isAuthenticated && !authLoading">
          <v-col>
            <HomeChuaDangNhap />
          </v-col>
        </v-row>

        <v-row v-if="isAuthenticated">
          <v-col cols="sm-2 xs-1">
            <left-side-bar></left-side-bar>
          </v-col>
          <v-col cols="sm-10 xs-9">
            <v-container fluid fill-height grid-list-md>
              <v-layout justify-center>
                <router-view></router-view>
              </v-layout>
            </v-container>
          </v-col>
        </v-row>
      </v-main>
    </v-app>
  </v-card>
</template>
<script>
import LeftSideBar from "./components/Layout/LeftSideBar";
import HomeChuaDangNhap from "./components/TrangChu/HomeChuaDangNhap";
import Navigation from "./components/Navigation/Navigation.vue";
import { mapGetters, mapState } from "vuex";
export default {
  components: {
    LeftSideBar,
    HomeChuaDangNhap,
    Navigation,
  },

  data() {
    return {
    };
  },
  created: function() {
    //this.ob = this.$store.getters.getProfile;
    //if (this.$store.getters.isAuthenticated) {
      //this.$store.dispatch(USER_REQUEST, {email: this.email1, password: this.pass1});
      //this.$store.dispatch(USER_ACCOUNT, this.ob).then(() => {});
    //}
  },
  computed: {
    ...mapGetters(["getProfile", "isAuthenticated", "isProfileLoaded"]),
    ...mapState({
      authLoading: (state) => state.auth.status === "loading",
      name: (state) => `${state.user.profile.email} ${state.user.profile.password}`,
      email1: (state) => state.user.profile.email,
      pass1: (state) => state.user.profile.password,
    }),
  },
  methods: {
    
  },
};
</script>
