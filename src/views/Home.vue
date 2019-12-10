<template>
  <div class="home" :style="bgImg">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <div class="home-div" :style="homeDiv"></div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {},
  data() {
    return {
      bgImg: {
        background: "url(" + require("../assets/home.jpg") + ") no-repeat center center fixed",
        backgroundSize: "cover"
      },
      homeDiv: {
        height: "100%",
        width: "100%"
      }
    };
  },
  created(){
    this.homeDiv.height = window.innerHeight + 'px';
    this.homeDiv.width = window.innerWidth + 'px';
  }
};
</script>
<style scoped>
</style>