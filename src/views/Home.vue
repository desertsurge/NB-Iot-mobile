<template>
  <div class="home" :style="bgImg">
    <div class="home-div" :style="homeDiv">
      <div class="logo_ctt">
        <img class="logo" alt="Vue logo" src="../assets/qrcode.png" />
      </div>
      <!-- <div class="item">本工具主要针对NB-Iot相关测试开发工具辅助，帮助工程师快速处理事务。</div> -->
      <div class="github_out_ctt">
        <div class="github_ctt">
          <a href="javascript:void(0)" class="github_a">
            <img src="../assets/github-logo-mona.svg" class="github_a_img" />
            <div class="github_a_ctt">
              <h5>欢迎关注，添砖加瓦</h5>
              <span>希望能给苦逼的人带来帮助</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "home",
  components: {},
  data() {
    return {
      count: 3,
      bgImg: {
        background: "no-repeat center center fixed",
        backgroundSize: "cover",
        // backgroundImage: 'url(../images/home-0.jpg)'
      },
      homeDiv: {
        height: "100%",
        width: "100%",
      },
    };
  },
  created() {
    this.homeDiv.height = window.innerHeight - 60 + "px";
    this.homeDiv.width = window.innerWidth + "px";
    const index = Math.round(Math.random() * 99) % this.count
    this.bgImg.backgroundImage = `url(./images/home-${index}.jpg)`;
  },
};
</script>
<style scoped>
.home {
  margin-bottom: 60px;
}
.logo_ctt {
  text-align: center;
  padding-top: 40px;
  padding-bottom: 40px;
}
.logo {
  width: 100px;
}
.item {
  width: 70%;
  margin: 10px auto;
}
.github_out_ctt {
  position: absolute;
  bottom: 60px;
  width: 100%;
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
