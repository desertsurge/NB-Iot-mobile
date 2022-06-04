<template>
  <div class="wrapper">
    <page-header backUrl="grid" title="GMS频点"></page-header>
    <div class="content">
      <input type="number" v-model="f" placeholder="请输入频率" class="input input-top" />
      <div class="convert-btns">
        <van-row>
          <van-col span="8" @click="pgsm2point()">
            <div>PGSM</div>
            <div>935-960</div>
          </van-col>
          <van-col span="8" @click="egsm2point()">
            <div>EGSM</div>
            <div>925.2-935</div>
          </van-col>
          <van-col span="8" @click="dcs2point()">
            <div>DCS</div>
            <div>1805-1880</div>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="8" @click="pgsm2fre()">
            <div>1-124</div>
            <div>PGSM</div>
          </van-col>
          <van-col span="8" @click="egsm2fre()">
            <div>975-1023</div>
            <div>EGSM</div>
          </van-col>
          <van-col span="8" @click="dcs2fre()">
            <div>512-885</div>
            <div>DCS</div>
          </van-col>
        </van-row>
      </div>
      <input type="number" v-model="p" placeholder="请输入频点" class="input input-bottom" />
    </div>
  </div>
</template>

<script>
import { Row, Col } from "vant";
import PageHeader from "../components/PageHeader.vue";

export default {
  data() {
    return {
      f: "",
      p: ""
    };
  },
  components: {
    vanRow: Row,
    vanCol: Col,
    PageHeader
},
  created() {},
  methods: {
    pgsm2point() {
      this.p = ((this.f - 935) * 5).toFixed(0);
    },
    pgsm2fre() {
      this.f = (935 + 0.2 * this.p).toFixed(1);
    },
    egsm2point() {
      this.p = ((this.f - 935) * 5 + 1024).toFixed(0);
    },
    egsm2fre() {
      this.f = (935 + 0.2 * (this.p - 1024)).toFixed(1);
    },
    dcs2point() {
      this.p = ((this.f - 1805.2) * 5 + 512).toFixed(0);
    },
    dcs2fre() {
      this.f = (1805.2 + 0.2 * (this.p - 512)).toFixed(1);
    }
  }
};
</script>

<style scoped>
.content {
  margin: 20px;
  border: 2px solid #4cae4c;
  border-radius: 20px;
  margin-top: 90px;
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
  background-color: #5cb85c;
  color: #fff;
}
.convert-btns .van-row .van-col {
  border: 1px solid #4cae4c;
  padding: 20px 10px;
  text-align: center;
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
