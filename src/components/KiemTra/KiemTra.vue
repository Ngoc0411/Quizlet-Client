<template>
  <v-card width="100%">
    <v-container fluid grid-list-md>
      <v-app-bar
        color="light-blue darken-3"
        dark
        scroll-target="#scrolling-techniques-6"
        @click="showModalBaiKiemTra()"
      >
        <h2 style="text-align: center; margin-top:5px;">
          Bài kiểm tra
        </h2>
      </v-app-bar>
      <!-- <v-btn class="ma-2" color="info" @click="showModalBaiKiemTra()">
        Bắt đầu làm bài kiểm tra số 1
        <template v-slot:loader>
          <span class="custom-loader">
            <v-icon light>mdi-cached</v-icon>
          </span>
        </template>
      </v-btn> -->

      <v-list two-line>
          <v-list-item-group
            multiple
          >
              <v-list-item @click="showModalBaiKiemTra()">
                <template>
                  <v-list-item-content>
                    <v-list-item-title > Bài kiểm tra tổng hợp</v-list-item-title>

                  </v-list-item-content>
                </template>
              </v-list-item>

              <v-divider
                :key="index"
              ></v-divider>
          </v-list-item-group>
        </v-list>

      <modal-bai-kiem-tra
          ref="ModalBaiKiemTra"
        ></modal-bai-kiem-tra>
    </v-container>
  </v-card>
</template>
<script>
import ModalBaiKiemTra from "./ModalBaiKiemTra.vue";
export default {
  name: "App",
  components: {
    ModalBaiKiemTra
  },
  data() {
    return {
    };
  },
  created() {},
  methods: {
    showModalBaiKiemTra() {
      this.$refs.ModalBaiKiemTra.ShowDialogBaiKiemTra();
    },
  },
};
</script>
