<template>
  <div class="grid">
    <van-grid clickable :column-num="2">
      <van-grid-item icon="discount" text="功率" to="/power" />
      <van-grid-item icon="exchange" text="频率" to="/frequency" />
      <van-grid-item icon="eye-o" text="5G频点" to="/nr"/>
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
