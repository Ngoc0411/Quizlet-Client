<template>
  <v-card id="lateral" width="100%">
    <v-toolbar dark tabs flat color="indigo">
      <v-toolbar-title>Lop hoc may</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <template v-slot:extension>
        <v-tabs v-model="tabs" align-with-title>
          <v-tab @click="HocPhanOrThanhVien(0)">
            Học phần
          </v-tab>
          <v-tab @click="HocPhanOrThanhVien(1)">
            Thành viên
          </v-tab>
          <v-tabs-slider color="pink"></v-tabs-slider>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-data-table
      v-if="idHocPhanThanhVien == 0"
      :headers="headers0"
      :items="danhSachHocPhan"
      :items-per-page="15"
      class="elevation-1"
      style="width : 100%"
    >
      <template v-slot:item.TenHocPhan="{ item }">
        <router-link :to="'/chitiethocphan'">{{ item.TenHocPhan }}</router-link>
      </template>
    </v-data-table>
    <v-data-table
      v-if="idHocPhanThanhVien == 1"
      :headers="headers1"
      :items="danhSachThanhVien"
      :items-per-page="15"
      class="elevation-1"
      style="width : 100%"
    >
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      idHocPhanThanhVien: 0,
      headers0: [
        {
          isUpdate: false,
          search: "",
          text: "Hoc phan",
          align: "center",
          sortable: false,
          value: "TenHocPhan",
        },
        { text: "Nguoi tao", value: "TenNguoiTao", align: "center" },
        { text: "Mô tả", value: "MoTa", align: "center" },
      ],
      danhSachHocPhan: [
        {
          ID: 1,
          TenHocPhan: "Phat trien ung dung web",
          TenNguoiTao:
            "Nguyen Quoc Khanh dep trai vai lin ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccaaaaaa",
          MoTa: "lớp toàn cây hài, nghệ sĩ nhân dân",
          //SLThanhVien: 6,
        },
        {
          ID: 2,
          TenHocPhan: "Phat trien ung dung web",
          TenNguoiTao:
            "Nguyen Quoc Khanh dep trai vai lin ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccaaaaaa",
          MoTa: "lớp toàn cây hài, nghệ sĩ nhân dân",
          //SLThanhVien: 6,
        },
      ],
      headers1: [
        {
          isUpdate: false,
          search: "",
          text: "Ten thanh vien",
          align: "center",
          sortable: false,
          value: "TenThanhVien",
        },
        { text: "Chuc vu", value: "ChucVu", align: "center" },
        //{ text: 'Mô tả', value: 'MoTa', align: 'center'},
      ],
      danhSachThanhVien: [
        {
          ID: 1,
          TenThanhVien: "Phat trien ung dung web",
          ChucVu:
            "Nguyen Quoc Khanh dep trai vai lin ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccaaaaaa",
          //MoTa: 'lớp toàn cây hài, nghệ sĩ nhân dân',
          //SLThanhVien: 6,
        },
        {
          ID: 2,
          TenThanhVien: "Nguyễn ABC",
          ChucVu: "anh giáo viên may mắn",
          //MoTa: 'lớp toàn cây hài, nghệ sĩ nhân dân',
          //SLThanhVien: 6,
        },
      ],
      items: [
        { title: "Thêm học phần" },
        { title: "Xóa lớp học" },
        { title: "Thêm thành viên" },
      ],
    };
  },
  created() {},
  methods: {
    HocPhanOrThanhVien(id) {
      this.idHocPhanThanhVien = id;
    },
  },
};
</script>
