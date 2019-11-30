<template>
  <div class="home">
    <div class="logo_ctt">
      <img class="logo" alt="Vue logo" src="../assets/logo.png" />
    </div>
    <div class="item">本工具主要针对NB-Iot相关测试开发工具辅助，帮助工程师快速处理事务。</div>
    <div>
      <div class="github_ctt">
        <a href="https://github.com/desertsurge/NB-Iot-mobile" target="_blank" class="github_a">
          <img
            src="https://github.githubassets.com/images/modules/site/sponsors/logo-mona.svg"
            class="github_a_img"
          />
          <div class="github_a_ctt">
            <h5>欢迎关注，添砖加瓦</h5>
            <span>更多功能在路上，有需求，有想法，欢迎关注讨论</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {}
};
</script>
<style scoped>
.home {
  margin-bottom: 60px;
}
.logo_ctt {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 40px;
}
.logo {
  width: 50%;
}
.item {
  width: 70%;
  margin: 10px auto;
}
.github_ctt {
  background: #ffeef8;
  border: 1px solid #ec6cb9 !important;
  margin-bottom: 24px !important;
  overflow: hidden !important;
  border-radius: 6px !important;
  margin: 24px auto;
  width: 90%;
}
.github_a {
  display: flex !important;
  text-decoration: none !important;
  padding: 16px !important;
  position: relative !important;
  align-items: flex-start !important;
  color: #24292e !important;
}
.github_a_img {
  margin-right: 8px !important;
  float: left !important;
  width: 16.66667%;
  border-style: none;
}
.github_a_ctt {
  line-height: 1.25 !important;
  font-size: 12px !important;
}
.github_a_ctt h5 {
  margin: 0;
  padding-right: 16px !important;
  margin-bottom: 4px !important;
}
</style>