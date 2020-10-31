<template>
  <v-card width="100%">
    <v-container fluid grid-list-md>
      <v-layout>
        <v-flex xs12>
          <v-row>
            <v-col cols="3">
              <v-text-field
                append-icon="search"
                label="Search..."
                v-model="searchKeywords"
                @input="timKiemThe"
              ></v-text-field>
            </v-col>
            <v-col cols="8"></v-col>
            <v-col cols="1">
              <v-btn
                @click="showModalThemSua({}, false)"
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
              <v-data-table
                :headers="headers"
                :items="danhSachThe"
                :items-per-page="15"
                class="elevation-1"
                style="width : 100%"
              >
                <template v-slot:item.thaotac="{ item }">
                  <v-btn
                    @click="showModalThemSua(item, true)"
                    icon
                    small
                    class="mx-0"
                  >
                    <v-icon small color="black">edit</v-icon>
                  </v-btn>
                  <v-btn @click="XacNhanXoaThe(item)" icon small class="mx-0">
                    <v-icon small color="pink">delete</v-icon>
                  </v-btn>
                </template>
              </v-data-table>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-dialog v-model="dialogDelete" persistent max-width="400">
          <v-card>
            <v-card-title class="headline">Xác nhận xóa sản phẩm</v-card-title>
            <v-card-text
              >Bạn có chắc chắn muốn xóa sản phẩm này không ?</v-card-text
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click.native="dialogDelete = false" text>Hủy</v-btn>
              <v-btn color="green darken-1" text @click="XoaThe()">Xóa</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <modal-them-sua-the
          ref="ModalThemSuaThe"
          @getLaiDanhSach="getData()"
        ></modal-them-sua-the>
      </v-layout>
    </v-container>
  </v-card>
</template>
<script>
import ModalThemSuaThe from "./ModalThemSuaThe.vue";
export default {
  name: "App",
  components: {
    ModalThemSuaThe,
  },
  data() {
    return {
      danhSachThe: [],
      isUpdate: false,
      dialogDelete: false,
      theCanXoa: {},
      earchKeywords: {},
      headers: [
        {
          isUpdate: false,
          search: "",
          text: "Thuật ngữ",
          align: "center",
          sortable: false,
          value: "ThuatNgu",
        },
        { text: "Giai Nghia", value: "GiaiNghia", align: "center" },
        { text: "Hình ảnh", value: "HinhAnh", align: "center" },
        //{ text: 'Loại sản phẩm', value: 'TenLoaiSanPham', align: 'center'},
        //{ text: 'Nha cung cap', value: 'TenNhaCungCap', align: 'center'},
        //{ text: 'don vi tinh', value: 'TenDonViTinh', align: 'center'},
        //{ text: 'Mô tả ngắn', value: 'MoTaNgan', align: 'center'},
        //{ text: 'Mô Tả chi tiết', value: 'MoTa', align: 'center'},
        //{ text: 'So dien thoai' , value: 'SoDienThoai', align: 'center'},
        //{ text: 'Dia chi' , value: 'DiaChi', align: 'center'},
        { text: "Thao tác", value: "thaotac", align: "center" },
      ],
    };
  },
  created() {},
  methods: {
    showModalThemSua(item, isUpdate) {
      this.$refs.ModalThemSuaThe.ShowDialogThemSuaThe(item, isUpdate); //
    },
  },
};
</script>
