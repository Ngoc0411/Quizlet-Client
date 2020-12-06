<template>
  <v-row justify="center">
    <v-dialog v-model="DialogKetQua" persistent max-width="1000px">
      <template> </template>
      <v-card>
        <v-card-title
          class="title py-8 px-10 white--text"
          style="background-color: #4257b2; font-size: large;"
        >
          <span class="headline">
            Kết quả
          </span>
          <v-spacer></v-spacer>
          <v-btn @click="DialogKetQua = false;" small icon class="ma-0" dark>
            <v-icon small>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
              <h2 style="color: green; margin-top:10px;">Số câu trả lời đúng: {{ SoCau }}</h2>
              <h2 style="color: green; margin-top:10px;">Điểm: {{ Diem }} /10</h2>
              <h2 style="color: green; margin-top:10px;">Phần trăm đúng: {{ Phantram }} % </h2>
        </v-card-text>
        <v-card-actions>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  components: {},
  data: () => ({
    DialogKetQua: false,
    SoCau: 0,
    Diem: 0,
    Phantram: 0,
  }),
  created() {
  },
  methods: {
    ShowDialogKetQua(Diem, TongSoCau) {
      this.SoCau = Diem;
      this.DialogKetQua = true;
      this.Diem = (this.SoCau / TongSoCau) * 10;
      this.Phantram = (this.SoCau / TongSoCau) * 100;
    },
  },
};
</script>
