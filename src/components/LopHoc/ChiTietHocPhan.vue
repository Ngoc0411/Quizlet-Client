<template>
    <v-container fluid>
     <v-row 
        width="100%"
      >
        <v-col cols="12">
          <p class="font-weight-black">
            Danh sách các thuật ngữ.
          </p>
        </v-col>
      </v-row>

      <v-row dense>
        <v-col
          v-for="card in cards"
          :key="card.ID"
          :cols="12"
        >
          <v-card>
            <v-row>
              <v-col
              :cols="3">
                <v-card-text v-text="card.ThuatNgu"></v-card-text>
              </v-col>
              <v-col
              :cols="3">
                <v-card-text v-text="card.GiaiNghia"></v-card-text>
              </v-col>
              <v-col
              :cols="3">
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-dialog
      v-model="dialog"
      max-width="400"
    >
      <v-card>
        <v-card-title class="headline">
          Mày có muốn kiểm tra ngay bây giờ không?
        </v-card-title>

        <v-card-text>
         Bài này rất là dễ //Cho phần mô tả vào đây nếu cần
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Đéo! :v
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Ok! Cho bố mày kiểm tra!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
      </v-row>
      <v-row
        width="100%">
        <v-col cols="12"
          class="text-right" 
        >
          <v-btn 
            text 
            color = "green"
            float: right
            @click="dialog = true"
          >
            <v-spacer></v-spacer>
            Bắt đầu kiểm tra    >
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      cards: [
        { ID:"1", ThuatNgu: 'drill', GiaiNghia: 'máy khoan', Anh: 'jkfkdbsfbkfdjsbfkds',},
        {  ID:"2",ThuatNgu: 'ajhsbdbsabd', GiaiNghia: 'kdsfjdsfds', Anh: 'jkfkdbsfbkfdjsbfkds',},
        {  ID:"3",ThuatNgu: 'ajhsbdbsabd', GiaiNghia: 'kdsfjdsfds', Anh: 'jkfkdbsfbkfdjsbfkds',},
      ],
    }),
  }
</script>