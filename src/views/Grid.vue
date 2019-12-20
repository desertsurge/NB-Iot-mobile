<template>
  <div class="grid">
    <van-grid clickable :column-num="2">
      <van-grid-item icon="gold-coin" text="功率换算" to="/power" />
      <van-grid-item icon="gift" text="NB频点换算" to="/frequency" />
      <van-grid-item icon="eye" text="3G以下频点" to="/nr"/>
      <van-grid-item icon="medal" text="3G-6G频点" to="/nr36"/>
      <van-grid-item icon="underway" text="GSM频点" to="/gsm"/>
      <van-grid-item icon="gem" text="UMTS频点" to="/nr36"/>
      <van-grid-item icon="award" text="LTE频点" to="/nr36"/>
      <van-grid-item icon="diamond" text="TDD频点" to="/nr36"/>
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
