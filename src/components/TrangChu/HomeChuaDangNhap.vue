<template>
  <v-card style="margin-top: -12px;">
    <v-row>
      <v-carousel
      hide-delimiter-background
    show-arrows-on-hover
    cycle>
        <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src">
        </v-carousel-item>
      </v-carousel>
    </v-row>
    <v-container class="grey lighten-5">
      <v-row align="center" justify="center">
        <h1>90% of students who use Quizlet report higher grades</h1>

        <v-col cols="1">
          <img
            src="https://images.prismic.io/quizlet-prod/96d962d7-4cac-4b5d-9442-478054f61473_bannecker-benefit2.png?auto=compress,format"
            alt=""
            height="100px"
          />
        </v-col>
      </v-row>

      <v-row align="center" justify="center">
        <v-col cols="3">
          <img
            src="https://images.prismic.io/quizlet-prod/f566f00a-c722-47f4-8d0e-cfe6dfea372e_bannecker-benefit1.png?auto=compress,format"
            alt=""
            height="300px"
          />
        </v-col>

        <v-col cols="4">
          <h3>You bring the brains, we’ll bring everything else</h3>
          <br />
          <p>
            From flashcards to help you learn francais, to games that make it
            easy to get a handle on history, use a variety of tools to conquer
            any challenge.
          </p>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="4">
          <h3>Don’t get frustrated.</h3>
          <h3>Get it done.</h3>
          <br />
          <p>
            When even the smallest lessons feel like a victory, it’s easy to
            keep going.
          </p>
        </v-col>

        <v-col cols="3">
          <img
            src="https://images.prismic.io/quizlet-prod/63a034d5-9f01-4024-a6bf-e36996575fd1_bannecker-benefit3.png?auto=compress,format"
            alt=""
            height="300px"
          />
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row align="center" justify="space-around">
        <h1>Ready to start getting better grades?</h1>
      </v-row>
      <v-row align="center" justify="space-around" style="margin-top: 20px;">
        <v-btn depressed color="primary" style="font-size: 20px; font-family: Florence, cursive" @click="HienThiRegister()">
          Get Started
        </v-btn>
      </v-row>
    </v-container>
    <Register ref="Register"></Register>
  </v-card>
</template>
<script>
import Register from "../Login_Signin/Register";
export default {
  components: {
    Register,
  },

  data() {
    return {
      items: [
        {
          src:
            "https://images.prismic.io/quizlet-prod/30898f0b-c334-4506-bef5-0043509ebd2d_bannecker-teachers.png?auto=compress,format",
        },
        {
          src:
            "https://images.prismic.io/quizlet-prod/15213773-90fa-480b-90cf-64468a8b8441_Carousel_Illo_Bannecker_01.png?auto=compress,format",
        },
        {
          src:
            "https://images.prismic.io/quizlet-prod/2d142bea-760b-4dc8-96ff-06737d183a84_Carousel_Illo_Bannecker_03.png?auto=compress,format",
        },
        {
          src:
            "https://cdn.timviec365.vn/pictures/images/cach-hoc-thong-minh.jpg",
        },
      ],
    };
  },
  methods: {
    HienThiRegister(){
      this.$refs.Register.ShowDialogRegister();
    },
  },
};
</script>
