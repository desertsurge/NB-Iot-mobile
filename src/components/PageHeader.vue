<template>
  <div class="page-header-content">
    <div class="page-header-left" :v-if="backUrl" @click="back">
      <i class="van-icon van-icon-arrow-left page-header-icon"><!----></i
      ><span class="page-header-left-text">返回</span>
    </div>
    <div class="page-header-title van-ellipsis">{{ title }}</div>
  </div>
</template>
<script>
export default {
  name: "PageHeader",
  props: {
    title: String,
    backUrl: String,
  },
  methods: {
    back() {
      this.$router.push(this.backUrl);
    },
  },
};
</script>
<style scoped>
.page-header-content {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  height: 46px;
}
.page-header-left {
  position: absolute;
  top: 0;
  bottom: 0;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  padding: 0 16px;
  font-size: 14px;
  cursor: pointer;
  left: 0;
}
.page-header-left-text {
  color: #1989fa;
}
.page-header-icon {
  margin-right: 4px;
  font-size: 16px;
  color: #1989fa;
}
.page-header-title {
  max-width: 60%;
  margin: 0 auto;
  color: #323233;
  font-weight: 500;
  font-size: 16px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>