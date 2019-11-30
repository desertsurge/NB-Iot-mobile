<template>
  <div class="wrapper">
    <div class="content">
      <input type="number" v-model="dbm" placeholder="请输入dBm值" class="input input-top" />
      <div class="convert-btns">
        <div class="btn convert iconfont" @click="toW">转换成瓦</div>
        <div class="btn reset iconfont" @click="reset">重置</div>
        <div class="btn convert iconfont" @click="toDbm">转换成Dbm</div>
      </div>
      <input type="number" v-model="w" placeholder="请输入瓦数" class="input input-bottom" />
    </div>
  </div>
</template>

<script>
//10*Math.log10(20*1000) = 43 =>dBm
//Math.pow(10, 43/10)/1000 = 20 =>W
export default {
  data() {
    return {
      dbm: "",
      w: ""
    };
  },
  created() {},
  methods: {
    toDbm() {
      if (this.w) {
        this.dbm = (10 * Math.log10(this.w * 1000)).toFixed(2);
      }
    },
    toW() {
      if (this.dbm) {
        this.w = (Math.pow(10, this.dbm / 10) / 1000).toFixed(2);
      }
    },
    reset() {
      this.dbm = "";
      this.w = "";
    }
  }
};
</script>

<style scoped>
.content {
  margin: 20px;
  border: 2px solid #4cae4c;
  border-radius: 20px;
}
.input {
  outline: none;
  width: 100%;
  line-height: 4em;
  text-align: center;
  font-size: 18px;
  color: #555555;
  background-color: transparent;
  border: 0;
}

.convert-btns {
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
}
.btn {
  padding-top: 20px;
  padding-bottom: 20px;
  margin-bottom: 0;
  font-size: 18px;
  font-weight: 400;
  text-align: center;
}
.convert {
  color: #fff;
  background-color: #5cb85c;
  border-color: #4cae4c;
}
.reset {
  color: #fff;
  background-color: #f0ad4e;
  border-color: #eea236;
}
</style>
