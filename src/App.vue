<template>
  <div id="app">
    <router-view />
    <div id="nav">
      <van-tabbar route>
        <van-tabbar-item replace to="/" icon="home-o">主页</van-tabbar-item>
        <van-tabbar-item replace to="/grid" icon="clock-o">工具</van-tabbar-item>
      </van-tabbar>
    </div>
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
