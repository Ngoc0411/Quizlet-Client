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
              <v-btn
                @click="showModalThemSua({},idhp, false)"
                small
                class="my-2 mt-5 mr-2"
                fab
                dark
                color="primary"
              >
                <v-icon dark>mdi-plus</v-icon>
              </v-btn>
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
                          <v-btn
                          
                            icon
                            class="mx-0"
                            @click="showModalThemSua(item, idhp, true)"
                          >
                            <v-icon color="teal">edit</v-icon>
                          </v-btn>
                          <v-btn 
                          icon class="mx-0" @click="XacNhanXoaThe(item)">
                            <v-icon color="red">delete</v-icon>
                          </v-btn>
                        </template>
                      </v-card-actions>
                    </v-card>
                  </v-item>
                </v-col>
              </v-row>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-dialog v-model="dialogDelete" persistent max-width="400">
          <v-card>
            <v-card-title class="headline">Xác nhận xóa thẻ</v-card-title>
            <v-card-text>Bạn có chắc chắn muốn xóa thẻ này không ?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click.native="dialogDelete = false" text>Hủy</v-btn>
              <v-btn color="green darken-1" text @click="XoaThe()">Xóa</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <modal-them-sua-the
          ref="ModalThemSuaThe"
          @getLaiDanhSach="getThes()"
        ></modal-them-sua-the>
      </v-layout>
    </v-container>
  </v-card>
</template>
<script>
import { HTTP } from "@/HTTPServices";
import ModalThemSuaThe from "../HocPhanCuaToi/ModalThemSuaThe";
import { mapState } from "vuex";
import APIS from "../../apisServer";
import FlipCard from "vue-flipcard";
export default {
  name: "App",
  components: {
    FlipCard,
    ModalThemSuaThe,
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
    showModalThemSua(item, idhp, isUpdate) {
      this.$refs.ModalThemSuaThe.ShowDialogThemSuaThe(item, idhp, isUpdate);
    },
    getThes() {
      HTTP.get("lophochocsinhs/" + this.idhp + "/" + "abc" + "/" + "def").then((response) => {
        this.danhSachTheCuaToi = response.data;
      });
    },
    XacNhanXoaThe(item) {
      this.dialogDelete = true;
      this.theCanXoa = item;
    },
    XoaThe() {
      HTTP.delete("thes/" + this.theCanXoa.TheID).then((response) => {
        console.log(response);
        this.getThes();
        this.dialogDelete = false;
      });
    },
  },
};
</script>
