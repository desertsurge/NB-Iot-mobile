<template>
  <div id="app">
    <div id="nav">
      <van-tabbar route>
        <van-tabbar-item replace to="/" icon="home-o">主页</van-tabbar-item>
        <van-tabbar-item replace to="/frequency" icon="clock-o">频点</van-tabbar-item>
        <van-tabbar-item replace to="/power" icon="chart-trending-o">功率</van-tabbar-item>
      </van-tabbar>
    </div>
    <router-view />
  </div>
</template>
<script>
import { Tabbar, TabbarItem } from "vant";

export default {
  components: { vanTabbar: Tabbar, vanTabbarItem: TabbarItem }
};
</script>
<style>
#app {
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
