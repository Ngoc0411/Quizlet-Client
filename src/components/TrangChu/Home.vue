<template>
    <v-card width="100%">
      <v-container fluid grid-list-md>
          <v-layout >
            <v-flex xs12>
              <v-layout>
                <v-flex xs12>

                  
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
      </v-container>
    </v-card>
</template>
<script>
export default {
  name: 'App',
  components:{
  },
  data() {
    return{
      isUpdate : false,
      dialogDelete : false,
      danhSachSanPham : [],
      sanPhamCanXoa : {},
      searchKeywords : "",
      headers: [
          {
            isUpdate : false,
            search:'',
            text: 'Tên sản phẩm',
            align: 'center',
            sortable: false,
            value: 'TenSanPham',
          },
          { text: 'Hình ảnh', value: 'HinhAnh', align: 'center'},
          { text: 'Loại sản phẩm', value: 'TenLoaiSanPham', align: 'center'},
          { text: 'Thương hiệu', value: 'TenThuongHieu', align: 'center'},
          { text: 'Giá mua vào', value: 'GiaMuaVao', align: 'center'},
          { text: 'Giá bán ra', value: 'GiaBanRa', align: 'center'},
          { text: 'Số lượng trong kho', value: 'SoLuong', align: 'center'},
          { text: 'Mô tả ngắn', value: 'MoTaNgan', align: 'center'},
          { text: 'Mô Tả chi tiết', value: 'MoTa', align: 'center'},
          { text: 'Thao tác', value: 'thaotac', align: 'center'},
        ],
    }
  },
  created(){
    },
  methods: {
  },
};
</script>
