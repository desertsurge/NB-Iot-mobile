<template>
  <div class="grid">
    <van-grid clickable :column-num="2">
      <van-grid-item icon="discount" text="功率换算" to="/power" />
      <van-grid-item icon="exchange" text="NB频点换算" to="/frequency" />
      <van-grid-item icon="eye-o" text="3G以下频点" to="/nr"/>
      <van-grid-item icon="after-sale" text="3G-6G频点" to="/nr36"/>
    </van-grid>
  </div>
</template>

<script>
// @ is an alias to /src
import { Grid, GridItem } from 'vant';

export default {
  name: "grid",
  components: {
    vanGrid: Grid, vanGridItem: GridItem
  }
};
</script>
