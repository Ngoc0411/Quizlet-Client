<template>
        <v-list
          dense
          rounded
          height="1000"
          weidth="500px"
        >
          <v-list-item
            v-for="item in lstMenu1"
            :key="item.title"
            link
            :to="item.link"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-progress-linear
            color="indigo"
            buffer-value="0"
            stream
          ></v-progress-linear>
          <v-list-item
            v-for="item in lstMenu2"
            :key="item.title"
            link
            :to="item.link"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        
</template>
<script>
  export default {
    data () {
      return {
        lstMenu1: [],
        lstMenu2: [],
      }
    },
    created (){
        this.lstMenu1 = this.getListMenu1();
        this.lstMenu2 = this.getListMenu2();
    },
    methods : {
        getListMenu1(){
            return [
                {
                    title: 'Trang chủ',
                    name: 'trangchu',
                    icon: 'home',
                    show: true,
                    link: '/trangchu'
                },
                {
                    title: 'Tiến độ',
                    name: 'tiendo',
                    icon: 'poll',
                    show: true,
                    link: '/tiendo'
                },
                {
                    title: 'Cài đặt',
                    name: 'caidat',
                    icon: 'poll',
                    show: true,
                    link: '/caidat'
                },
            ]
        },
        getListMenu2(){
            return [
                {
                    title: 'Từ mới',
                    name: 'tumoi',
                    icon: 'home',
                    show: true,
                    link: '/tumoi'
                },
                {
                    title: 'Lớp học',
                    name: 'lophoc',
                    icon: 'poll',
                    show: true,
                    link: '/lophoc'
                },
                {
                    title: 'Kiểm tra',
                    name: 'kiemtra',
                    icon: 'poll',
                    show: true,
                    link: '/kiemtra'
                },
            ]
        },
    },
  }
</script>