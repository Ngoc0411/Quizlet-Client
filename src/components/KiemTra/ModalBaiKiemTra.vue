<template>
  <v-row justify="center">
    <v-dialog v-model="DialogBaiKiemTra" persistent max-width="1000px">
      <template> </template>
      <v-card>
        <v-card-title
          class="title py-8 px-10 white--text"
          style="background-color: #4257b2; font-size: large;"
        >
          <span class="headline">
            Bài kiểm tra
          </span>
          <v-spacer></v-spacer>
          <v-btn @click="DialogBaiKiemTra = false" small icon class="ma-0" dark>
            <v-icon small>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-row style="margin-right:5px;">
                <v-col v-for="(item, i) in danhSachTheCuaToi" :key="i" cols="4">
                  <v-item>
                    <v-card>
                      <v-img
                        v-if="item.Anh != ''"
                        :src="HOST + item.Anh"
                        @click="$refs.inpFile.click()"
                        aspect-ratio="0.75"
                        class="grey darken-4"
                        height="170"
                        width="300"
                      ></v-img>
                      <v-card-title>
                        <v-text-field
                          class="py-0 px-2"
                          v-model="item.DapAnCuaNguoiDung"
                          @input="KiemTraDapAn(item.DapAnCuaNguoiDung, item.ThuatNgu)"
                          label="Thuật ngữ"
                        ></v-text-field>
                      </v-card-title>

                      <v-card-actions> </v-card-actions>
                    </v-card>
                  </v-item>
                </v-col>
              </v-row>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="#4257b2"
            class="mr-4 py-8 px-10 white--text"
            style="width:100%"
            @click="NopBai(Diem, danhSachTheCuaToi.length)"
          >
            Nộp bài
          </v-btn>
        </v-card-actions>
        <ket-qua
          ref="KetQua"
        ></ket-qua>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { HTTP } from "@/HTTPServices";
import { mapState } from "vuex";
import APIS from "../../apisServer";
import KetQua from "./KetQua";
export default {
  components: {
    KetQua,
  },
  
    data: () => ({
    DialogBaiKiemTra: false,
    danhSachTheCuaToi: [],
    HOST: APIS.HOST,
    DapAn:[],
    Diem: 0,
  }),
  computed: mapState({
    profile: (state) => state.user.profile,
    accid: (state) => state.user.profile.taiKhoanID,
  }),
  created() {
    this.getThes();
  },
  methods: {
    ShowDialogBaiKiemTra() {
      this.DialogBaiKiemTra = true;
    },
    getThes() {
      HTTP.get("thes/" + this.accid + "/" + "abc").then((response) => {
        this.danhSachTheCuaToi = response.data;
      });
    },
    KiemTraDapAn(dapan, dapandung){
      if(dapan.toUpperCase() === dapandung.toUpperCase()){
        this.Diem ++;
      }
    },
    NopBai(Diem, TongSoCau){
      this.$refs.KetQua.ShowDialogKetQua(Diem, TongSoCau);
      this.Diem = 0;
      this.DialogBaiKiemTra = false;
      this.danhSachTheCuaToi.DapAnCuaNguoiDung = "";
      //for(var i = 0; i < danhSachTheCuaToi.length; i++){
        //if(danhSachTheCuaToi[0].getter.DapAnCuaNguoiDung === "abc"){
        //  this.Diem ++;
        //}
      //}
      //HTTP.post("kiemtras/", "12").then((response) => {
      //  this.Diem = response.data;
      //});
    }
  },
};
</script>
