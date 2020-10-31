<template>
  <v-card width="100%">
    <v-container fluid grid-list-md>
      <v-row width="100%">
        <v-col cols="6">
          <p class="font-weight-black">
            Danh sách lop hoc.
          </p>
        </v-col>
        <v-col cols="6"> </v-col>
      </v-row>
      <v-layout>
        <v-flex xs12>
          <v-layout>
            <v-flex xs12>
              <v-data-table
                :headers="headers"
                :items="danhSachLopHoc"
                :items-per-page="15"
                class="elevation-1"
                style="width : 100%"
              >
                <template v-slot:item.TenLopHoc="{ item }">
                  <router-link :to="'/chitietlophoc'">{{
                    item.TenLopHoc
                  }}</router-link>
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
  name: "App",
  components: {},
  data() {
    return {
      headers: [
        {
          isUpdate: false,
          search: "",
          text: "Tên lớp học",
          align: "center",
          sortable: false,
          value: "TenLopHoc",
        },
        { text: "Tên người tạo", value: "TenNguoiTao", align: "center" },
        { text: "Mô tả", value: "MoTa", align: "center" },
        { text: "Số lượng thành viên", value: "SLThanhVien", align: "center" },
      ],
      danhSachLopHoc: [
        {
          ID: 1,
          TenLopHoc: "Phat trien ung dung web",
          TenNguoiTao:
            "Nguyen Quoc Khanh dep trai vai lin ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccaaaaaa",
          MoTa: "lớp toàn cây hài, nghệ sĩ nhân dân",
          SLThanhVien: 6,
        },
        {
          ID: 2,
          TenLopHoc: "Lớp học máy",
          TenNguoiTao: "Nguyen Quoc Khanh dep trai vai dai",
          MoTa: "lớp toàn máy khoan, máy dập, máy đục",
          SLThanhVien: 6,
        },
      ],
    };
  },
  created() {},
  methods: {},
};
</script>
