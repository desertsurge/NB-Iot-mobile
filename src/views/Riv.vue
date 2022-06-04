<template>
  <div class="wrapper">
    <page-header backUrl="grid" title="Location & Bandwidth"></page-header>
    <div class="content">
      <input
        type="number"
        v-model.number="rbStart"
        placeholder="请输入RB Start值"
        class="input input-top"
      />
      <input
        type="number"
        v-model.number="lrb"
        placeholder="请输入LRB值"
        class="input input-top"
      />
      <div class="convert-btns">
        <div class="btn convert iconfont" @click="toRiv">
          转换成LocationAndBandwidth
        </div>
        <div class="btn reset iconfont" @click="reset">重置</div>
        <div class="btn convert iconfont" @click="toRbStart">转换成rbStart</div>
      </div>
      <input
        type="number"
        v-model.number="riv"
        placeholder="请输入LocationAndBandwidth"
        class="input input-bottom"
      />
    </div>
  </div>
</template>
<script>
import PageHeader from '../components/PageHeader.vue';
export default {
  components: {
    PageHeader,
  },
  data() {
    return {
      rbStart: null,
      lrb: null,
      riv: null,
    };
  },
  created() {},
  methods: {
    toRiv() {
      if (this.rbStart >= 0 && this.lrb > 0) {
        if (this.lrb - 1 <= Math.floor(275 / 2)) {
          this.riv = 275 * (this.lrb - 1) + this.rbStart;
        } else {
          this.riv = 275 * (275 - this.lrb + 1) + (275 - 1 - this.rbStart);
        }
      }
    },
    toRbStart() {
      if (this.riv) {
        let x = Math.floor(this.riv / 275) + (this.riv % 275);
        if (x < 275) {
          this.rbStart = this.riv % 275;
          this.lrb = Math.floor(this.riv / 275) + 1;
        } else {
          this.rbStart = 275 - (this.riv % 275) - 1;
          this.lrb = 275 - Math.floor(this.riv / 275) + 1;
        }
      }
    },
    reset() {
      this.rbStart = null;
      this.riv = null;
      this.lrb = null;
    },
  },
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
