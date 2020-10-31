<template>
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="card in cards"
          :key="card.TenHocPhan"
          :cols="6"
        >
          <v-card>
          
            <v-card-title v-text="card.TenHocPhan"></v-card-title>
            <v-card-subtitle v-text="card.MoTa"></v-card-subtitle>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
  export default {
    data: () => ({
      cards: [
        { TenHocPhan: 'ajhsbdbsabdd', TenNguoiTao: 'kdsfjdsfds', MoTa: 'jkfkdbsfbkfdjsbfkds',},
        { TenHocPhan: 'ajhsbdbssabd', TenNguoiTao: 'kdsfjdsfds', MoTa: 'jkfkdbsfbkfdjsbfkds',},
        { TenHocPhan: 'ajhsbdbsabrd', TenNguoiTao: 'kdsfjdsfds', MoTa: 'jkfkdbsfbkfdjsbfkds',},
      ],
    }),
  }
</script>
