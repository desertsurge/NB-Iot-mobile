<template>
  <div class="noAuth">
    <div class="container_box">
      <div class="container container_unknow_link">
        <span class="ic ic_unknow"></span>
        <h1 class="text_area_title">请在微信中访问本应用</h1>
        <div class="text_area">
          <p class="text_area_desc">您的访问未被授权</p>
          <!-- <p class="text_area_desc">
            继续访问：<a href="#">Home</a>
          </p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  data() {
    return {
      homeDiv: {
        height: "100%",
        width: "100%",
      },
    };
  },
  created() {
    this.homeDiv.height = window.innerHeight - 60 + "px";
    this.homeDiv.width = window.innerWidth + "px";
  },
};
</script>
<style scoped>
.container_unknow_link.container_unknow_link {
    padding-top: 80px;
    text-align: center;
}
.container_unknow_link .ic_unknow {
    display: inline-block;
    width: 150px;
    height: 150px;
    margin: 0 auto;
    text-align: center;
    background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzIiIGhlaWdodD0iNzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNNzIgMzYuNDQ0QzcyIDE2LjExNyA1NS44ODMgMCAzNS41NTYgMCAxNi4xMTcgMCAwIDE2LjExNyAwIDM2LjQ0NCAwIDU1Ljg4MyAxNi4xMTcgNzIgMzUuNTU2IDcyIDU1Ljg4MyA3MiA3MiA1NS44ODMgNzIgMzYuNDQ0eiIgZmlsbD0iIzEwQUVGRiIvPjxwYXRoIGQ9Ik0zNi40ODggNTQuMjg0aC0uOTc2YTIuMDQyIDIuMDQyIDAgMDAyLjAzOC0xLjk5N2wuNDI2LTIyLjAwNmExLjk0OSAxLjk0OSAwIDAwLTEuOTUyLTEuOTk3aC0uMDQ4YTEuOTUgMS45NSAwIDAwLTEuOTUyIDEuOTk3bC40MjYgMjIuMDA2YTIuMDQ2IDIuMDQ2IDAgMDAyLjAzOCAxLjk5N3pNMzYgMTguMjYxYTMgMyAwIDEwMCA2IDMgMyAwIDAwMC02eiIgZmlsbD0iI0ZGRiIvPjwvZz48L3N2Zz4=) no-repeat 50%;
    background-size: cover;
}
.container_unknow_link.container_unknow_link .text_area_title {
    text-align: center;
    margin-top: 30px;
    margin-bottom: 30px;
    font-weight: 400;
}
.container_unknow_link .text_area {
    display: inline-block;
}
.container_unknow_link.container_unknow_link .text_area_desc {
    text-align: left;
}
</style>