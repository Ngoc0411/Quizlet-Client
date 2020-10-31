<template>
    
    <v-card width="100%">
      
      <v-container fluid grid-list-md>
        <v-row 
        width="100%"
      >
        <v-col cols="6">
          <p class="font-weight-black">
            Danh sách hoc phan.
          </p>
        </v-col>
        <v-col cols="6">
        </v-col>
    </v-row>
          <v-layout >
            <v-flex xs12>
              <v-layout>
                <v-flex xs12>
                  <v-data-table
                    :headers="headers"
                    :items="danhSachHocPhan"
                    :items-per-page="15"
                    class="elevation-1"
                    style="width : 100%"
                  >
                  <template v-slot:item.TenHocPhan="{ item }">
                      <router-link :to="'/chitiethocphan'">{{item.TenHocPhan}}</router-link>
                  </template>
                  </v-data-table>
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
      headers: [
          {
            isUpdate : false,
            search:'',
            text: 'Tên lớp học',
            align: 'center',
            sortable: false,
            value: 'TenHocPhan',
          },
          { text: 'Tên người tạo', value: 'TenNguoiTao', align: 'center'},
          { text: 'Mô tả', value: 'MoTa', align: 'center'},
          { text: 'Số lượng thuật ngữ', value: 'SLThuatNgu', align: 'center'},
        ],
      danhSachHocPhan : [
        {
          ID: 1,
          TenHocPhan: 'Phat trien ung dung web',
          TenNguoiTao: 'Nguyen Quoc Khanh ',
          MoTa: 'lớp toàn cây hài, nghệ sĩ nhân dân',
          SLThuatNgu: 6,
        },
        {
          ID: 2,
          TenHocPhan: 'Phat trien ung dung web',
          TenNguoiTao: 'Nguyen Quoc Khanh ',
          MoTa: 'lớp toàn cây hài, nghệ sĩ nhân dân',
          SLThuatNgu: 6,
        },
      ], 
    }
  },
  created(){
      this.getData();
    },
  methods: {
  },
};
</script>