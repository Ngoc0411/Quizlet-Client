<template>
  <v-card width="100%">
    <v-container fluid grid-list-md>
      <v-layout>
        <v-flex xs12>
          <v-app-bar
            color="blue lighten-2"
            dark
            scroll-target="#scrolling-techniques-6"
          >
            <h2 style="text-align: center; margin-top:5px;">
              {{ currentHocPhan.TenHocPhan }}
            </h2>
          </v-app-bar>
          <v-row>
            <v-col cols="3">
              <v-text-field
                append-icon="search"
                label="Search..."
              ></v-text-field>
            </v-col>
            <v-col cols="8"></v-col>
            <v-col cols="1">
            </v-col>
          </v-row>
          <v-layout>
            <v-flex xs12>
              <v-row style="margin-right:5px;">
                <v-col v-for="(item, i) in danhSachTheCuaToi" :key="i" cols="3">
                  <v-item>
                    <v-card>
                      <FlipCard height="170" width="284">
                        <template slot="front">
                          <v-img
                            v-if="item.Anh != ''"
                            :src="HOST + item.Anh"
                            @click="$refs.inpFile.click()"
                            aspect-ratio="0.75"
                            class="grey darken-4"
                            height="170"
                            width="283"
                          ></v-img>
                        </template>
                        <template slot="back">
                          <span>{{ item.CachSuDung }}</span>
                        </template>
                      </FlipCard>
                      <v-card-title>
                        {{ item.ThuatNgu }}
                      </v-card-title>
                      <v-card-subtitle>
                        {{ item.PhatAm }}
                        <br />
                        {{ item.GiaiNghia }}
                      </v-card-subtitle>

                      <v-card-actions>
                        <template>
                        </template>
                      </v-card-actions>
                    </v-card>
                  </v-item>
                </v-col>
              </v-row>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>
<script>
import { HTTP } from "@/HTTPServices";
import { mapState } from "vuex";
import APIS from "../../apisServer";
import FlipCard from "vue-flipcard";
export default {
  name: "App",
  components: {
    FlipCard,
  },
  data() {
    return {
      currentHocPhan: {},
      isToggle: false,
      danhSachThe: [],
      isUpdate: false,
      dialogDelete: false,
      theCanXoa: {},
      selectedItem: 1,
      danhSachTheCuaToi: [],
      HOST: APIS.HOST,
      flipped: false,
      idhp: 0,
    };
  },
  computed: mapState({
    profile: (state) => state.user.profile,
    accid: (state) => state.user.profile.taiKhoanID,
  }),
  created() {
    this.idhp = parseInt(this.$route.params.id);
    this.getHocPhanById(this.idhp);
    this.getThes();
  },
  methods: {
    getHocPhanById(id) {
      HTTP.get("hocphans/" + id).then((response) => {
        this.currentHocPhan = response.data;
      });
    },
    getThes() {
      HTTP.get("lophochocsinhs/" + this.idhp + "/" + "abc" + "/" + "def").then((response) => {
        this.danhSachTheCuaToi = response.data;
      });
    },
  },
};
</script>
